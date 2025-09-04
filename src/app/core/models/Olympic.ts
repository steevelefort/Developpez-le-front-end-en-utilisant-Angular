import { Participation } from "./Participation";

/**
 * Olympic data model for a country
 * Contains basic information about a country and its Olympic participations
 */
export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
