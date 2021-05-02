import { Person } from './person'

export interface Message {
    id: number;
    timestamp: number;
    user: Person;
    content: string;
}