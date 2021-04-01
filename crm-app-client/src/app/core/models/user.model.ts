export interface User {
    id: string;
    email: string;
    name: string;
    roles: string[];
    unverified: boolean;
    blocked: boolean;
    admin: boolean;
    goodUser: boolean;
    goodAdmin: boolean;
}