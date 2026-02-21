import axios from "axios";
import { ScheduleEvent, ScheduleTeam } from "../components/types/baseTypes";

const VALORANT_API_URL = "https://vlr.orlandomm.net/api/v1/matches";

export function getValorantSchedule(): Promise<ScheduleEvent[]> {
    return axios.get(VALORANT_API_URL).then(response => {
        const matches = response.data.data;
        if (!Array.isArray(matches)) return [];
        return matches.map((match: any) => mapVLRMatchToScheduleEvent(match)).filter((event: ScheduleEvent | null) => event !== null) as ScheduleEvent[];
    }).catch(error => {
        console.error("Error fetching Valorant schedule:", error);
        return [];
    });
}

function mapVLRMatchToScheduleEvent(match: any): ScheduleEvent | null {
    if (!match.teams || match.teams.length < 2) return null;

    const team1Data = match.teams[0];
    const team2Data = match.teams[1];

    // Determine state
    let state: "completed" | "unstarted" | "inProgress" = "unstarted";
    const status = (match.status || "").toUpperCase();

    if (status === "LIVE") state = "inProgress";
    else if (status === "COMPLETED" || status === "FINISHED") state = "completed";
    else if (status === "UPCOMING" || status.includes("day") || status.includes("week")) state = "unstarted";
    else state = "unstarted"; // default

    const getTeam = (data: any, opponentData: any): ScheduleTeam => {
        const gameWins = parseInt(data.score) || 0;
        const opponentWins = parseInt(opponentData?.score) || 0;

        let outcome: "win" | "loss" | undefined = undefined;
        if (state === "completed") {
            if (gameWins > opponentWins) outcome = "win";
            else if (gameWins < opponentWins) outcome = "loss";
        }

        return {
            code: (data.name || "TBD").substring(0, 3).toUpperCase(),
            image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg",
            name: data.name || "TBD",
            record: { wins: 0, losses: 0 },
            result: {
                gameWins: gameWins,
                outcome: outcome
            },
            // score: undefined // No live round score available
        };
    };

    const team1 = getTeam(team1Data, team2Data);
    const team2 = getTeam(team2Data, team1Data);

    // Match Details
    let matchStateDetails = "";
    if (state === "inProgress") {
        matchStateDetails = "LIVE";
    } else if (state === "completed") {
        matchStateDetails = "Final";
    } else {
        try {
            matchStateDetails = new Date(match.utcDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        } catch (e) {
            matchStateDetails = "";
        }
    }

    return {
        league: {
            name: match.tournament || "Valorant",
            slug: "valorant"
        },
        blockName: match.event || "",
        match: {
            id: match.id ? `val-${match.id}` : "val-unknown",
            strategy: { count: 3, type: "bestOf" },
            teams: [team1, team2]
        },
        startTime: new Date(match.utcDate || new Date()),
        state: state,
        type: "match",
        matchStateDetails: matchStateDetails
    };
}

