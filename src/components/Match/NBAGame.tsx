import React from "react";
import { EventDetails, ScheduleEvent } from "../types/baseTypes";
import { ReactComponent as TeamTBDSVG } from '../../assets/images/team-tbd.svg';
import './styles/playerStatusStyle.css';
import '../Schedule/styles/scheduleStyle.css';

type Props = {
    eventDetails: EventDetails;
    scheduleEvent: ScheduleEvent;
};

export function NBAGame({ eventDetails, scheduleEvent }: Props) {
    const homeTeam = eventDetails.match.teams[1];
    const awayTeam = eventDetails.match.teams[0];
    const sportData = scheduleEvent.sportSpecificData || {};

    // Default to empty arrays if data missing
    const homeLinescores = sportData.homeLinescores || [];
    const awayLinescores = sportData.awayLinescores || [];
    const clock = sportData.clock || "";
    const period = sportData.period || 0;

    const getPeriodName = (p: number) => {
        if (p <= 4) return `Q${p}`;
        return `OT${p - 4}`;
    };

    // Calculate totals from linescores if score is not updated or to verify
    const homeTotal = homeLinescores.reduce((a: number, b: number) => a + b, 0);
    const awayTotal = awayLinescores.reduce((a: number, b: number) => a + b, 0);

    // Get score from scheduleEvent (which preserves the score property) if linescores are empty
    const scheduleHomeTeam = scheduleEvent.match.teams[1];
    const scheduleAwayTeam = scheduleEvent.match.teams[0];

    const displayHomeScore = homeTotal > 0 ? homeTotal : (scheduleHomeTeam.score || 0);
    const displayAwayScore = awayTotal > 0 ? awayTotal : (scheduleAwayTeam.score || 0);

    const isLive = scheduleEvent.state === "inProgress";
    const isFinished = scheduleEvent.state === "completed";

    return (
        <div className="status-live-game-card">
            <div className="status-live-game-card-content">
                <div className="live-game-stats-header">
                    {/* Away Team (Left) */}
                    <div className="live-game-card-team">
                        {awayTeam.image ? <img className="live-game-card-team-image" src={awayTeam.image} alt={awayTeam.name} /> : <TeamTBDSVG className="live-game-card-team-image" />}
                        <span><h4>{awayTeam.name}</h4></span>
                        <span className='outcome'>
                            <p>{awayTeam.record?.wins}-{awayTeam.record?.losses}</p>
                        </span>
                    </div>

                    {/* Scoreboard Center */}
                    <h1>
                        {isLive && <div className="gamestate-bg-in-game">LIVE</div>}
                        {isFinished && <div className="gamestate-bg-finished">FINAL</div>}

                        <div style={{ fontSize: '3rem', margin: '10px 0' }}>
                            {displayAwayScore} - {displayHomeScore}
                        </div>

                        <div style={{ fontSize: '1.5rem' }}>
                            {isLive ? `Q${period} ${clock}` : (isFinished ? "Final" : new Date(scheduleEvent.startTime).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}))}
                        </div>
                    </h1>

                    {/* Home Team (Right) */}
                    <div className="live-game-card-team">
                        {homeTeam.image ? <img className="live-game-card-team-image" src={homeTeam.image} alt={homeTeam.name} /> : <TeamTBDSVG className="live-game-card-team-image" />}
                        <span><h4>{homeTeam.name}</h4></span>
                        <span className='outcome'>
                            <p>{homeTeam.record?.wins}-{homeTeam.record?.losses}</p>
                        </span>
                    </div>
                </div>

                {/* Quarter Score Table */}
                <div className="status-live-game-card-table-wrapper" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <table className="status-live-game-card-table" style={{ maxWidth: '600px' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', paddingLeft: '20px' }}>Team</th>
                                <th>Q1</th>
                                <th>Q2</th>
                                <th>Q3</th>
                                <th>Q4</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'left', paddingLeft: '20px', fontWeight: 'bold' }}>{awayTeam.name}</td>
                                <td>{awayLinescores[0] || '-'}</td>
                                <td>{awayLinescores[1] || '-'}</td>
                                <td>{awayLinescores[2] || '-'}</td>
                                <td>{awayLinescores[3] || '-'}</td>
                                <td style={{ fontWeight: 'bold' }}>{displayAwayScore}</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left', paddingLeft: '20px', fontWeight: 'bold' }}>{homeTeam.name}</td>
                                <td>{homeLinescores[0] || '-'}</td>
                                <td>{homeLinescores[1] || '-'}</td>
                                <td>{homeLinescores[2] || '-'}</td>
                                <td>{homeLinescores[3] || '-'}</td>
                                <td style={{ fontWeight: 'bold' }}>{displayHomeScore}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
