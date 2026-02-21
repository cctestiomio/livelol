import React from "react";
import { EventDetails, ScheduleEvent } from "../types/baseTypes";
import { ReactComponent as TeamTBDSVG } from '../../assets/images/team-tbd.svg';
import './styles/playerStatusStyle.css';
import '../Schedule/styles/scheduleStyle.css';

type Props = {
    eventDetails: EventDetails;
    scheduleEvent: ScheduleEvent;
};

export function CS2Game({ eventDetails, scheduleEvent }: Props) {
    const team1 = eventDetails.match.teams[0];
    const team2 = eventDetails.match.teams[1];
    const sportData = scheduleEvent.sportSpecificData || {};

    // Map scores from API mock
    const maps = sportData.maps || [];

    const isLive = scheduleEvent.state === "inProgress";
    const isFinished = scheduleEvent.state === "completed";

    const getElapsed = (startTime: Date) => {
        const start = new Date(startTime).getTime();
        const current = new Date().getTime();
        const diff = current - start;
        if (diff < 0) return "00:00";
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) return `${hours}:${(minutes % 60) < 10 ? '0' : ''}${minutes % 60}:${seconds < 10 ? '0' : ''}${seconds}`;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="status-live-game-card">
            <div className="status-live-game-card-content">
                <div className="live-game-stats-header">
                    {/* Team 1 (Left) */}
                    <div className="live-game-card-team">
                        {team1.image ? <img className="live-game-card-team-image" src={team1.image} alt={team1.name} /> : <TeamTBDSVG className="live-game-card-team-image" />}
                        <span><h4>{team1.name}</h4></span>
                        <span className='outcome'>
                            <p>{team1.result.gameWins} Wins</p>
                        </span>
                    </div>

                    {/* Scoreboard Center */}
                    <h1>
                        {isLive && <div className="gamestate-bg-in-game">LIVE</div>}
                        {isFinished && <div className="gamestate-bg-finished">FINAL</div>}

                        <div style={{ fontSize: '3rem', margin: '10px 0' }}>
                            {team1.result.gameWins} - {team2.result.gameWins}
                        </div>

                        <div style={{ fontSize: '1.5rem' }}>
                            {isLive ? `Best of ${eventDetails.match.strategy.count} - ${getElapsed(scheduleEvent.startTime)}` : (isFinished ? "Final" : new Date(scheduleEvent.startTime).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}))}
                        </div>
                    </h1>

                    {/* Team 2 (Right) */}
                    <div className="live-game-card-team">
                        {team2.image ? <img className="live-game-card-team-image" src={team2.image} alt={team2.name} /> : <TeamTBDSVG className="live-game-card-team-image" />}
                        <span><h4>{team2.name}</h4></span>
                        <span className='outcome'>
                            <p>{team2.result.gameWins} Wins</p>
                        </span>
                    </div>
                </div>

                {/* Map Score Table */}
                <div className="status-live-game-card-table-wrapper" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <table className="status-live-game-card-table" style={{ maxWidth: '600px' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', paddingLeft: '20px' }}>Map</th>
                                <th>{team1.code} Score</th>
                                <th>{team2.code} Score</th>
                                <th>Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maps.length > 0 ? maps.map((map: any, index: number) => (
                                <tr key={index}>
                                    <td style={{ textAlign: 'left', paddingLeft: '20px', fontWeight: 'bold' }}>{map.name}</td>
                                    <td>{map.score.team1}</td>
                                    <td>{map.score.team2}</td>
                                    <td style={{ fontWeight: 'bold' }}>
                                        {map.score.team1 > map.score.team2 ? team1.code : (map.score.team2 > map.score.team1 ? team2.code : "-")}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '10px' }}>No detailed map stats available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
