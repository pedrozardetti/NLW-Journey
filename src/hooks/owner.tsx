import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Owner, CreateOwnerRequest, AuthOwnerRequest } from "../types/Owner";
import api from "../service/api";
import { saveToStorage } from "../utils/Storage";

interface AuthOwnerState {
  token: string;
  owner: Owner;
}

interface OwnerContextData {
  token: string;
  owner: Owner;
  status: number;
  authenticated: boolean;
  createOwner(owner: CreateOwnerRequest): Promise<void>;
  signIn(owner: AuthOwnerRequest): Promise<void>;
  signOut(): void;
}

const OwnerContext = createContext<OwnerContextData>({} as OwnerContextData);

const OwnerProvider = ({ children }: any) => {
  const [ownerData, setOwnerData] = useState<AuthOwnerState>({} as AuthOwnerState);
  const [authenticated, setAuthenticated] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const createOwner = useCallback(async ({ name, email, password }: CreateOwnerRequest) => {
    try {
      const response = await api.post("/owners/create", { name, email, password });
      setStatus(response.status);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signIn = useCallback(async ({ email, password }: AuthOwnerRequest) => {
    try {
      const response = await api.post("/owners/auth", { email, password });
      saveToStorage("token", response.data.token);
      setStatus(response.status);
      setOwnerData({ token: response.data.token, owner: response.data.owner });
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("owner");
    setOwnerData({} as AuthOwnerState);
    setAuthenticated(false);
  }, []);

  return (
    <OwnerContext.Provider value={{
      status,
      createOwner,
      owner: ownerData.owner,
      token: ownerData.token,
      authenticated,
      signIn,
      signOut,
    }}>
      {children}
    </OwnerContext.Provider>
  );
};

function useOwner() {
  const context = useContext(OwnerContext);

  return context;
}

export { OwnerProvider, useOwner };