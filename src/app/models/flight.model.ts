export interface Flight {
    additionalInformation: string;
    code: string;
    crew: Crew[];
    departureTime: string;
    destination: string;
    origin: string;
    returnTime: string;
    withRocketDiscount: boolean;
    key: string;
}

  export interface Crew {
    job: string;
    name: string;
}
