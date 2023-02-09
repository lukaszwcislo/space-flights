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

export const DefaultInitialFlightsData: Flight[] = [
  {
    additionalInformation: 'Good weather, all ok.',
    code: 'RFF011',
    crew: [
      {
        job: 'co_pilot',
        name: 'Jonas Berk'
      },
      {
        job: 'co_pilot',
        name: 'Jason Statham'
      },
      {
        job: 'mechanic',
        name: 'Jane Katles'
      },
      {
        job: 'senior_cabin_crew',
        name: 'Steven Bronski'
      }
    ],
    departureTime: '14-03-2018, 12:05',
    destination: 'Moon',
    origin: 'Earth',
    returnTime: '14-03-2018, 13:00',
    withRocketDiscount: true,
    key: ''
  },
  {
    additionalInformation: 'No extra info',
    code: 'RTL0333',
    crew: [
      {
        job: 'co_pilot',
        name: 'Mark Twain'
      }
    ],
    departureTime: '12-03-2015',
    destination: 'Merkury',
    origin: 'Mars',
    returnTime: '13-03-2015',
    withRocketDiscount: true,
    key: ''
  },
  {
    additionalInformation: '',
    code: 'BRS02',
    crew: [],
    departureTime: '15-04-2018, 17:15',
    destination: 'Mars',
    origin: 'Venus',
    returnTime: '15-04-2018, 23:15',
    withRocketDiscount: true,
    key: ''
  },
  {
    additionalInformation: '',
    code: 'LNOOP03',
    crew: [
      {
        job: 'senior_cabin_crew',
        name: 'Hamel Sank'
      }
    ],
    departureTime: '13-10-2018, 15:10',
    destination: 'Milky Way',
    origin: 'Andromeda Galaxy',
    returnTime: '13-10-2018, 23:00',
    withRocketDiscount: true,
    key: ''
  },
  {
    additionalInformation: 'Short flight, easy.',
    code: 'BOLPES0',
    crew: [
      {
        job: 'mechanic',
        name: 'Giorgio Armani'
      },
      {
        job: '',
        name: ''
      }
    ],
    departureTime: '23-12-2018, 10:00',
    destination: 'Uranus',
    origin: 'Saturn',
    returnTime: '23-12-2018, 11:00',
    withRocketDiscount: true,
    key: ''
  },
]
