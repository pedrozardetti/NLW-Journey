import { Trip } from "./Trip";

export interface Owner {
    name: string,
    email: string,
    password: string,
    trips: Trip[],
}

export interface AuthOwnerRequest extends Omit<Owner, 'name' | 'trips'> {}

export interface CreateOwnerRequest extends Omit<Owner, 'trips'> {}