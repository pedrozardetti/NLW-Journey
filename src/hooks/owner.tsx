import { createContext, useCallback, useContext, useState } from "react";
import { Owner, CreateOwnerRequest, AuthOwnerRequest } from "../types/Owner";
import api from "../service/api";
import { saveToStorage } from "../utils/Storage";

interface AuthOwnerState {
  token: string;
  owner: Owner;
}

interface AuthContextData {
  token: string;
  owner: Owner;
  status: number;
  createOwner(owner: CreateOwnerRequest): Promise<number>;
  signIn(owner: AuthOwnerRequest): Promise<void>;
  signOut(): void;

}

const AuthOwnerContext = createContext<AuthContextData>({} as AuthContextData);

const AuthOwnerProvider = ({ children }: any) => {
  const [ownerData, setOwnerData] = useState<AuthOwnerState>({} as AuthOwnerState);

  const [status, setStatus] = useState(0);

  const createOwner = useCallback(async ({ name, email, password }: CreateOwnerRequest): Promise<number> => {

    try {
      const response = await api.post("/owners/create", {
        name,
        email,
        password

      });

      setStatus(response.status)

      return response.status;
    } catch (error) {
      console.log(error)
    }
  }, []);

  const signIn = useCallback(async ({ email, password }: AuthOwnerRequest) => {

    try {
      const response = await api.post("/owners/auth", {
        email,
        password
      });

      saveToStorage("token", response.data.token);
      saveToStorage("owner", response.data.owner);


      setStatus(response.status)
      setOwnerData({ token: response.data.token, owner: response.data.owner })
    } catch (error) {
      console.log(error)
    }

  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("owner");
    setOwnerData({} as AuthOwnerState);
  }, []);

  return (
    <AuthOwnerContext.Provider value={{
      status: status,
      createOwner,
      owner: ownerData.owner,
      token: ownerData.token,
      signIn: signIn,
      signOut

    }}>
      {children}
    </AuthOwnerContext.Provider>
  )


};

function useOwner(): AuthContextData {
  const context = useContext(AuthOwnerContext);
  return context;
}

export { AuthOwnerProvider, useOwner }

