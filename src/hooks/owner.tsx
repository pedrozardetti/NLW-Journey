import { createContext, useCallback, useState } from "react";
import { Owner } from "../types/Owner";
import {CreateOwnerRequest} from "../types/Owner"

interface AuthOwnerState {
    token: string,
    owner: Owner
}

interface AuthContextData {
    token: string,
    owner: Owner
}

const AuthOwnerContext = createContext<AuthContextData>({} as AuthContextData)

const AuthOwnerProvider = ({children} : any) => {

    const [ownerData, setOwnerData] = useState<AuthOwnerState> ({} as AuthOwnerState)

    const createOwner = useCallback(async ({} : CreateOwnerRequest))

}