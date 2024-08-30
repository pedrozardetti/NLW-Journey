export interface Trip {
    id: string,
    destination: string,
    starts_at: Date,
    ends_at: Date,
    confirmed: boolean,
    ownerId: string
}

export interface CreateTrip {
    destination: string,
    starts_at: Date,
    ends_at: Date,
    emails_to_invite: string[]
}

export interface TripList {
    trips: Trip[];
    page_number: number;
    page_size: number;
    total_pages: number;
}