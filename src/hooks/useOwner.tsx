import { useContext } from "react";
import { OwnerContext, OwnerContextData } from "../context/owner";

function useOwner(): OwnerContextData {
  const context = useContext(OwnerContext);

  return context;
}

export { useOwner };