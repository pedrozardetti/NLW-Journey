import { ReactNode } from "react";
import { createContext, useCallback, useState } from "react";
import { CreateTrip, Trip, TripList } from "../types/Trip";
import api from "../service/api";
import { ActivityRequest, ActivityResponse } from "../types/Activity";

interface TripState {
    Trip: Trip;
}

interface TripListState {
    TripList: TripList;
}

interface ActivityListState {
    ActivityList: ActivityResponse[];
}

interface ResponseStatus {
    status: number;
}

interface ActivityResponseStatus {
    status: number;
}

export interface TripContextData {
    getTrips(page_number: number, page_size: number): Promise<void>;
    createTrip(trip: CreateTrip): Promise<void>;
    getTripById(tripId: string): Promise<void>;
    inviteParticipants(tripId: string, emails_to_invite: string[]): Promise<void>;
    createActivity(tripId: string, activity: ActivityRequest): Promise<void>;
    getActivitiesByFilter(tripId: string, filter: string): Promise<void>;
    deleteActivityById(activityId: string): Promise<void>;
    TripList: TripList;
    responseStatus: ResponseStatus;
    tripData: TripState;
    activityResponseStatus: ActivityResponseStatus;
    activityList: ActivityListState;
}


const TripContext = createContext<TripContextData>({} as TripContextData);

const TripProvider = ({ children }: { children: ReactNode }) => {

    const [tripListData, setTripListData] = useState<TripListState>({} as TripListState);

    const [tripData, setTripData] = useState<TripState>({} as TripState);

    const [activityList, setActivityList] = useState<ActivityListState>({} as ActivityListState);

    const [responseStatus, setResponseStatus] = useState<ResponseStatus>({} as ResponseStatus);

    const [activityResponseStatus, setActivityResponseStatus] = useState<ActivityResponseStatus>({} as ActivityResponseStatus);

    const token = sessionStorage.getItem("token") ?? null;

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

            const trips: Trip[] = tripData.trips.map((trip: any) => ({
                id: trip.id,
                destination: trip.destination,
                starts_at: trip.startsAt,
                ends_at: trip.endsAt,
                confirmed: trip.confirmed,
                ownerName: trip.ownerName,
                ownerEmail: trip.ownerEmail
            }));

            const tripList: TripList = {
                trips,
                page_number: tripData.pageNumber,
                page_size: tripData.pageSize,
                total_pages: tripData.totalPages
            }

            setTripListData({ TripList: tripList });
        } catch (error) {
            console.log(error);
        }
    }, [token]);

    const getTripById = useCallback(async (tripId: string) => {
        try {
            const response = await api.get(`/trips/${tripId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const tripData = response.data;
            const trip: Trip = {
                id: tripData.id,
                destination: tripData.destination,
                starts_at: tripData.starts_at,
                ends_at: tripData.ends_at,
                confirmed: tripData.confirmed,
                ownerId: tripData.ownerId
            }

            setTripData({ Trip: trip });
        } catch (error) {
            console.log(error);
        }


    }, [token]);

    const inviteParticipants = useCallback(async (tripId: string, emails_to_invite: string[]) => {
        try {
            const response = await api.post(`/trips/invite/${tripId}`, {
                emails_to_invite
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const tripData = response.data;
            const trip: Trip = {
                id: tripData.id,
                destination: tripData.destination,
                starts_at: tripData.starts_at,
                ends_at: tripData.ends_at,
                confirmed: tripData.confirmed,
                ownerId: tripData.ownerId
            }

            setTripData({ Trip: trip });
        } catch (error) {
            console.log(error);

        }

    }, [token])

    const createActivity = useCallback(async (tripId: string, { name, occurs_at }: ActivityRequest) => {
        try {
            const response = await api.post(`/trips/${tripId}/activities`, {
                name,
                occurs_at
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setActivityResponseStatus({ status: response.status });
        } catch (error) {
            console.log(error);
        }
    }, [token])

    const getActivitiesByFilter = useCallback(async (tripId: string, filter: string) => {
        try {
            const response = await api.get(`/trips/${tripId}/activities?filter=${filter}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const activityData = response.data;

            const activityList: ActivityResponse[] = activityData.map((activity: ActivityResponse) => ({
                id: activity.id,
                name: activity.name,
                occurs_at: new Date(activity.occurs_at)
            }));

            setActivityList({ ActivityList: activityList });
        } catch (error) {
            console.log(error);
        }

    }, [token])

    const deleteActivityById = useCallback(async (activityId: string) => {
        try {
            const response = await api.delete(`/trips/${activityId}/activities`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setActivityResponseStatus({ status: response.status });
        } catch (error) {
            console.log(error);
        }
    }, [token])

    return (
        <TripContext.Provider value={{
            TripList: tripListData.TripList,
            getTrips: getTrips,
            createTrip: createTrip,
            responseStatus: responseStatus,
            getTripById: getTripById,
            inviteParticipants: inviteParticipants,
            createActivity: createActivity,
            activityResponseStatus: activityResponseStatus,
            tripData: tripData,
            activityList: activityList,
            getActivitiesByFilter: getActivitiesByFilter,
            deleteActivityById: deleteActivityById
        }}>
            {children}
        </TripContext.Provider>
    )
}


export { TripContext, TripProvider }