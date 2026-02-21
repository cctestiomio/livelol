import axios from "axios";
import { ScheduleEvent, ScheduleTeam, Result } from "../components/types/baseTypes";

const NBA_API_URL = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";

export function getNBASchedule(): Promise<ScheduleEvent[]> {
    return axios.get(NBA_API_URL).then(response => {
        const events = response.data.events || [];
        return events.map((event: any) => mapESPNEventToScheduleEvent(event)).filter((event: ScheduleEvent | null) => event !== null) as ScheduleEvent[];
    }).catch(error => {
        console.error("Error fetching NBA schedule:", error);
        return [];
    });
}

function mapESPNEventToScheduleEvent(event: any): ScheduleEvent | null {
    const competition = event.competitions?.[0];
    if (!competition) return null;

    const homeTeamData = competition.competitors.find((c: any) => c.homeAway === "home");
    const awayTeamData = competition.competitors.find((c: any) => c.homeAway === "away");

    if (!homeTeamData || !awayTeamData) return null;

    // Determine state first
    let state: "completed" | "unstarted" | "inProgress" = "unstarted";
    const statusState = competition.status.type.state; // "pre", "in", "post"
    if (statusState === "pre") state = "unstarted";
    else if (statusState === "in") state = "inProgress";
    else if (statusState === "post") state = "completed";

    const parseRecord = (recordSummary: string) => {
        try {
            if (!recordSummary) return { wins: 0, losses: 0 };
            const parts = recordSummary.split("-");
            if (parts.length >= 2) {
                return { wins: parseInt(parts[0]) || 0, losses: parseInt(parts[1]) || 0 };
            }
            return { wins: 0, losses: 0 };
        } catch (e) {
            return { wins: 0, losses: 0 };
        }
    };

    const getTeam = (data: any): ScheduleTeam => {
        const record = (data.records && data.records.length > 0) ? parseRecord(data.records[0].summary) : { wins: 0, losses: 0 };
        const myScore = parseInt(data.score) || 0;
        const opponentScore = parseInt(data.opponent?.score) || 0;

        let outcome: "win" | "loss" | undefined = undefined;
        if (state === "completed") {
            if (myScore > opponentScore) outcome = "win";
            else if (myScore < opponentScore) outcome = "loss";
        }

        const result: Result = {
            gameWins: 0,
            outcome: outcome
        };

        return {
            code: data.team.abbreviation,
            image: data.team.logo,
            name: data.team.displayName,
            record: record,
            result: result,
            score: myScore
        };
    };

    // We need opponent score for result calculation
    homeTeamData.opponent = awayTeamData;
    awayTeamData.opponent = homeTeamData;

    const homeTeam = getTeam(homeTeamData);
    const awayTeam = getTeam(awayTeamData);

    // Match Details (Time)
    let matchStateDetails = "";
    if (state === "inProgress") {
        matchStateDetails = `Q${competition.status.period} ${competition.status.displayClock}`;
    } else if (state === "completed") {
        matchStateDetails = "Final";
    } else {
        matchStateDetails =  new Date(event.date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }

    const homeLinescores = homeTeamData.linescores?.map((l: any) => l.value) || [];
    const awayLinescores = awayTeamData.linescores?.map((l: any) => l.value) || [];

    return {
        league: {
            name: "NBA",
            slug: "nba"
        },
        match: {
            id: `nba-${event.id}`,
            strategy: { count: 1, type: "bestOf" },
            teams: [awayTeam, homeTeam] // Away @ Home
        },
        startTime: new Date(event.date),
        state: state,
        type: "match",
        matchStateDetails: matchStateDetails,
        sportSpecificData: {
            clock: competition.status.displayClock,
            period: competition.status.period,
            homeLinescores: homeLinescores,
            awayLinescores: awayLinescores,
        }
    };
}
