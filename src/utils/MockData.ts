import { ScheduleEvent, EventDetails, WindowFrame, GameMetadata } from "../components/types/baseTypes";

export const MOCK_VALORANT_MATCH_ID = "val-1";
export const MOCK_NBA_MATCH_ID = "nba-1";

export const mockValorantSchedule: ScheduleEvent[] = [
    {
        startTime: new Date(),
        state: "inProgress",
        type: "match",
        league: { name: "VCT Americas", slug: "valorant" },
        match: {
            id: MOCK_VALORANT_MATCH_ID,
            strategy: { count: 3, type: "bestOf" },
            teams: [
                { code: "SEN", image: "https://static.lolesports.com/teams/sen-logo.png", name: "Sentinels", result: { gameWins: 1 }, record: { wins: 3, losses: 1 } },
                { code: "100T", image: "https://static.lolesports.com/teams/100t-logo.png", name: "100 Thieves", result: { gameWins: 0 }, record: { wins: 2, losses: 2 } }
            ]
        }
    },
    {
        startTime: new Date(new Date().getTime() + 3600000), // In 1 hour
        state: "unstarted",
        type: "match",
        league: { name: "VCT Americas", slug: "valorant" },
        match: {
            id: "val-2",
            strategy: { count: 3, type: "bestOf" },
            teams: [
                { code: "C9", image: "https://static.lolesports.com/teams/c9-logo.png", name: "Cloud9", result: { gameWins: 0 }, record: { wins: 2, losses: 2 } },
                { code: "NRG", image: "https://static.lolesports.com/teams/nrg-logo.png", name: "NRG", result: { gameWins: 0 }, record: { wins: 3, losses: 1 } }
            ]
        }
    },
     {
        startTime: new Date(new Date().getTime() - 7200000), // 2 hours ago
        state: "completed",
        type: "match",
        league: { name: "VCT Americas", slug: "valorant" },
        match: {
            id: "val-3",
            strategy: { count: 3, type: "bestOf" },
            teams: [
                { code: "LEV", image: "https://static.lolesports.com/teams/lev-logo.png", name: "Leviatán", result: { gameWins: 2, outcome: "win" }, record: { wins: 4, losses: 1 } },
                { code: "KRU", image: "https://static.lolesports.com/teams/kru-logo.png", name: "KRÜ Esports", result: { gameWins: 1, outcome: "loss" }, record: { wins: 0, losses: 5 } }
            ]
        }
    }
];

export const mockNBASchedule: ScheduleEvent[] = [
    {
        startTime: new Date(),
        state: "inProgress",
        type: "match",
        league: { name: "NBA", slug: "nba" },
        match: {
            id: MOCK_NBA_MATCH_ID,
            strategy: { count: 1, type: "bestOf" },
            teams: [
                { code: "LAL", image: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg", name: "Lakers", result: { gameWins: 0 }, record: { wins: 30, losses: 15 } },
                { code: "BOS", image: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg", name: "Celtics", result: { gameWins: 0 }, record: { wins: 35, losses: 10 } }
            ]
        }
    },
    {
        startTime: new Date(new Date().getTime() + 7200000),
        state: "unstarted",
        type: "match",
        league: { name: "NBA", slug: "nba" },
        match: {
            id: "nba-2",
            strategy: { count: 1, type: "bestOf" },
            teams: [
                 { code: "GSW", image: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg", name: "Warriors", result: { gameWins: 0 }, record: { wins: 25, losses: 20 } },
                 { code: "PHX", image: "https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg", name: "Suns", result: { gameWins: 0 }, record: { wins: 28, losses: 18 } }
            ]
        }
    }
];

export const mockEventDetails: { [key: string]: EventDetails } = {
    [MOCK_VALORANT_MATCH_ID]: {
        id: MOCK_VALORANT_MATCH_ID,
        type: "match",
        league: { name: "VCT Americas", slug: "valorant", id: "val-league", image: "" },
        tournament: { id: "val-tourney" },
        match: {
            strategy: { count: 3 },
            teams: [
                { id: "1", code: "SEN", name: "Sentinels", image: "https://static.lolesports.com/teams/sen-logo.png", result: { gameWins: 1 } },
                { id: "2", code: "100T", name: "100 Thieves", image: "https://static.lolesports.com/teams/100t-logo.png", result: { gameWins: 0 } }
            ],
            games: [
                { id: "val-g1", number: 1, state: "completed", teams: [{ id: "1", side: "blue" }, { id: "2", side: "red" }], vods: [] },
                { id: "val-g2", number: 2, state: "inProgress", teams: [{ id: "2", side: "blue" }, { id: "1", side: "red" }], vods: [] },
                { id: "val-g3", number: 3, state: "unstarted", teams: [{ id: "1", side: "blue" }, { id: "2", side: "red" }], vods: [] }
            ]
        },
        streams: []
    },
    [MOCK_NBA_MATCH_ID]: {
        id: MOCK_NBA_MATCH_ID,
        type: "match",
        league: { name: "NBA", slug: "nba", id: "nba-league", image: "" },
        tournament: { id: "nba-tourney" },
        match: {
            strategy: { count: 1 },
            teams: [
                { id: "1", code: "LAL", name: "Lakers", image: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg", result: { gameWins: 0 } },
                { id: "2", code: "BOS", name: "Celtics", image: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg", result: { gameWins: 0 } }
            ],
            games: [
                { id: "nba-g1", number: 1, state: "inProgress", teams: [{ id: "1", side: "blue" }, { id: "2", side: "red" }], vods: [] }
            ]
        },
        streams: []
    }
};

export const mockWindowFrames: { [key: string]: WindowFrame } = {
    [MOCK_VALORANT_MATCH_ID]: {
        gameState: "in_game",
        rfc460Timestamp: new Date().toISOString(),
        blueTeam: {
            totalKills: 13, // Valorant rounds?
            totalGold: 0,
            inhibitors: 0,
            towers: 0,
            barons: 0,
            dragons: [],
            participants: []
        },
        redTeam: {
            totalKills: 11,
            totalGold: 0,
            inhibitors: 0,
            towers: 0,
            barons: 0,
            dragons: [],
            participants: []
        }
    },
    [MOCK_NBA_MATCH_ID]: {
        gameState: "in_game",
        rfc460Timestamp: new Date().toISOString(),
        blueTeam: {
            totalKills: 105, // NBA points
            totalGold: 0,
            inhibitors: 0,
            towers: 0,
            barons: 0,
            dragons: [],
            participants: []
        },
        redTeam: {
            totalKills: 98,
            totalGold: 0,
            inhibitors: 0,
            towers: 0,
            barons: 0,
            dragons: [],
            participants: []
        }
    }
};

export const mockGameMetadata: GameMetadata = {
    patchVersion: "14.3.1",
    blueTeamMetadata: {
        esportsTeamId: "1",
        participantMetadata: []
    },
    redTeamMetadata: {
        esportsTeamId: "2",
        participantMetadata: []
    }
};
