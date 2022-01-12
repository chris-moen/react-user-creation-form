export interface StatesData {
    name: string;
    abbreviation: string;
}

export interface SelectAPIResponse {
    states: StatesData[];
    occupations: string[];
}

export interface UserAPIPostData {
    name?: string;
    email?: string;
    password?: string;
    occupation?: string;
    state?: string;
}