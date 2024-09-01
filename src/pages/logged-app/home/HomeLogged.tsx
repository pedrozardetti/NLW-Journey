import { useCallback, useEffect } from "react";
import { useTrip } from "../../../hooks/useTrip"
import { Trip } from "../../../types/Trip";

export default function HomeLogged() {

    const { TripList, getTrips } = useTrip();

    const handleGetTrips = useCallback(async () => {
        await getTrips(0, 5);
    }, [getTrips])

    useEffect(() => {
        handleGetTrips();

    }, [handleGetTrips])

    return (
        <div>
            <h1>Home</h1>
            {TripList?.trips.map((trip: Trip) => (
                <>
                    <div className="flex justify-between">
                        <span>{trip.destination}</span>
                        <span>{trip.starts_at}</span>
                        <span>{trip.ends_at}</span>
                    
                    </div>
                </>
            ))}
        </div>
    )
}   