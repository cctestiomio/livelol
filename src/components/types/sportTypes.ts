import { EventDetails, ScheduleEvent, WindowFrame } from "./baseTypes";

export interface SportGameProps {
    eventDetails: EventDetails;
    scheduleEvent: ScheduleEvent;
    // We might wrap the specific data in a generic field or use specific props
    sportSpecificData?: any;
}

export interface NBAMatchStats {
    quarterScores: {
        period: number;
        homeScore: number;
        awayScore: number;
    }[];
    clock: string;
    period: number;
    isHalftime?: boolean;
    isEndOfPeriod?: boolean;
}

export interface ValorantMatchStats {
    maps: {
        name: string;
        score: {
            team1: number;
            team2: number;
        }
    }[];
}

export interface CS2MatchStats {
    maps: {
        name: string;
        score: {
            team1: number;
            team2: number;
        }
    }[];
}
