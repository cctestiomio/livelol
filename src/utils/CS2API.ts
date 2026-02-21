import { ScheduleEvent, ScheduleTeam } from "../components/types/baseTypes";

// Note: No free public CORS-enabled API exists for CS2 live scores.
// This function returns a simulated list of matches for demonstration.

export function getCS2Schedule(): Promise<ScheduleEvent[]> {
    const now = new Date();

    const events: ScheduleEvent[] = [
        // Live Match
        createMatch("IEM Katowice 2026", "Group A", "Vitality", "FaZe", "VIT", "FAZE",
            "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Team_Vitality_logo.svg/200px-Team_Vitality_logo.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Faze_Clan.svg/200px-Faze_Clan.svg.png",
            1, 1, "inProgress", new Date(now.getTime() - 1000 * 60 * 45), // Started 45 mins ago
            "Map 3 - Round 12", 7, 5), // 7-5 score in current map

        // Upcoming
        createMatch("IEM Katowice 2026", "Group B", "G2", "NAVI", "G2", "NAVI",
            "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/G2_Esports_logo.svg/200px-G2_Esports_logo.svg.png",
            "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/NaVi_logo.svg/200px-NaVi_logo.svg.png",
            0, 0, "unstarted", new Date(now.getTime() + 1000 * 60 * 60 * 2), // In 2 hours
            ""),

        createMatch("IEM Katowice 2026", "Group A", "Spirit", "MOUZ", "TS", "MOUZ",
            "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Team_Spirit_logo.svg/200px-Team_Spirit_logo.svg.png",
            "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Mouz_logo.svg/200px-Mouz_logo.svg.png",
            0, 0, "unstarted", new Date(now.getTime() + 1000 * 60 * 60 * 5), // In 5 hours
            ""),

        // Completed
        createMatch("IEM Katowice 2026", "Group B", "Cloud9", "Virtus.pro", "C9", "VP",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cloud9_logo.svg/200px-Cloud9_logo.svg.png",
            "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Virtus.pro_logo.svg/200px-Virtus.pro_logo.svg.png",
            2, 0, "completed", new Date(now.getTime() - 1000 * 60 * 60 * 5), // 5 hours ago
            "Final"),
    ];

    return Promise.resolve(events);
}

function createMatch(
    leagueName: string, blockName: string,
    team1Name: string, team2Name: string,
    team1Code: string, team2Code: string,
    team1Image: string, team2Image: string,
    team1Wins: number, team2Wins: number,
    state: "completed" | "unstarted" | "inProgress",
    startTime: Date,
    details: string,
    team1Score?: number, team2Score?: number
): ScheduleEvent {
    let outcome1: "win" | "loss" | undefined = undefined;
    let outcome2: "win" | "loss" | undefined = undefined;

    if (state === "completed") {
        if (team1Wins > team2Wins) {
            outcome1 = "win";
            outcome2 = "loss";
        } else {
            outcome1 = "loss";
            outcome2 = "win";
        }
    }

    const team1: ScheduleTeam = {
        code: team1Code,
        image: team1Image,
        name: team1Name,
        record: { wins: 0, losses: 0 },
        result: { gameWins: team1Wins, outcome: outcome1 },
        score: team1Score
    };

    const team2: ScheduleTeam = {
        code: team2Code,
        image: team2Image,
        name: team2Name,
        record: { wins: 0, losses: 0 },
        result: { gameWins: team2Wins, outcome: outcome2 },
        score: team2Score
    };

    return {
        league: {
            name: leagueName,
            slug: "cs2"
        },
        blockName: blockName,
        match: {
            id: `cs2-${team1Code}-${team2Code}-${startTime.getTime()}`,
            strategy: { count: 3, type: "bestOf" },
            teams: [team1, team2]
        },
        startTime: startTime,
        state: state,
        type: "match",
        matchStateDetails: details
    };
}
