import { createContext, useCallback, useContext, useState } from "react";
import { Owner, CreateOwnerRequest, AuthOwnerRequest } from "../types/Owner";
import api from "../service/api";

interface AuthOwnerState {
  token: string;
  owner: Owner;
}

interface AuthContextData {
  status: number;
  createOwner(owner:CreateOwnerRequest): Promise<void>;
}

const AuthOwnerContext = createContext<AuthContextData>({} as AuthContextData);

const AuthOwnerProvider = ({ children }: any) => {
  const [ownerData, setOwnerData] = useState<AuthOwnerState>( {} as AuthOwnerState);

  const [status, setStatus] = useState(0);

  const createOwner = useCallback(async (owner: CreateOwnerRequest) => {
    try {
      const response = await api.post("/owners/create", {
        name: owner.name,
        email: owner.email,
        password: owner.password,


      });
      console.log(response.data)
      setStatus(response.status)
    } catch (error) {
        console.log(error)
    }
  }, []);

  return (
    <AuthOwnerContext.Provider value={{
        status: status,
        createOwner: createOwner
    
    }}>
        {children}
    </AuthOwnerContext.Provider>
  )

  
};

function useOwner(): AuthContextData {
    const context = useContext(AuthOwnerContext);
    return context;
  }

export {AuthOwnerProvider, useOwner}

