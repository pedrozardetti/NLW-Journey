import { createContext, useCallback, useState } from "react";
import { CreateTrip, Trip, TripList } from "../types/Trip";
import api from "../service/api";

interface TripListState {
    TripList: TripList;
}

interface ResponseStatus {
    status: number;
}

export interface TripContextData {
    TripList: TripList;
    getTrips(page_number: number, page_size: number): Promise<void>;
    createTrip(trip: CreateTrip): Promise<void>;
    responseStatus: ResponseStatus;
}


const TripContext = createContext<TripContextData>({} as TripContextData);

const TripProvider = ({ children }: any) => {

    const [tripListData, setTripListData] = useState<TripListState>({} as TripListState);

    const [responseStatus, setResponseStatus] = useState<ResponseStatus>({} as ResponseStatus);


    const token = sessionStorage.getItem("token") ?? null;

    console.log(token);

    const createTrip = useCallback(async ({ destination, starts_at, ends_at, emails_to_invite }: CreateTrip) => {
        try {
            const response = await api.post(`/trips`, {
                destination,
                starts_at,
                ends_at,
                emails_to_invite
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setResponseStatus({ status: response.status });
        } catch (error) {
            console.log(error);
        }
    }, [token])

    const getTrips = useCallback(async (page_number: number, page_size: number) => {
        try {
            const response = await api.get(`/trips?page_number=${page_number}&page_size=${page_size}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const tripData = response.data;

            const trips: Trip[] = tripData.trips.map((trip: Trip) => ({
                id: trip.id,
                destination: trip.destination,
                starts_at: new Date(trip.starts_at),
                ends_at: new Date(trip.ends_at),
                confirmed: trip.confirmed,
                ownerId: trip.ownerId
            }));

            const tripList: TripList = {
                trips,
                page_number: tripData.page_number,
                page_size: tripData.page_size,
                total_pages: tripData.total_pages
            }

            setTripListData({ TripList: tripList });
        } catch (error) {
            console.log(error);
        }
    }, [token]);




    return (
        <TripContext.Provider value={{
            TripList: tripListData.TripList,
            getTrips: getTrips,
            createTrip: createTrip
        }}>
            {children}
        </TripContext.Provider>
    )
}


export { TripContext, TripProvider }