import { useContext } from "react";
import { TripContext, TripContextData } from "../context/trip";

function useTrip(): TripContextData {
    const context = useContext(TripContext);

    if (!context) {
        throw new Error("useOwner must be used within an OwnerProvider");
    }

    return context;
}

export { useTrip };