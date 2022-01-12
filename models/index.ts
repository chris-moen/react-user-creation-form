export interface StatesData {
    name: string;
    abbreviation: string;
}

export interface SelectAPIResponse {
    states: StatesData[];
    occupations: string[];
}