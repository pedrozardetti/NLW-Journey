export interface Trip {
    id: string,
    destination: string,
    starts_at: string,
    ends_at: string,
    confirmed: boolean,
    ownerName: string,
    ownerEmail: string
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