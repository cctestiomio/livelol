import { EventDetails, WindowFrame, ScheduleEvent } from "../types/baseTypes";
import { ReactComponent as TeamTBDSVG } from '../../assets/images/team-tbd.svg';

type Props = {
    eventDetails: EventDetails;
    lastWindowFrame: WindowFrame;
    scheduleEvent: ScheduleEvent;
};

export function SimpleMatch({ eventDetails, lastWindowFrame, scheduleEvent }: Props) {
    const blueTeam = eventDetails.match.teams[0];
    const redTeam = eventDetails.match.teams[1];
    const blueScore = lastWindowFrame.blueTeam.totalKills;
    const redScore = lastWindowFrame.redTeam.totalKills;

    // Retrieve records from scheduleEvent (assuming index alignment)
    const blueTeamRecord = scheduleEvent.match.teams[0]?.record;
    const redTeamRecord = scheduleEvent.match.teams[1]?.record;

    // Use gameTime/period from windowFrame if available (for Mock Data), otherwise calculate elapsed
    const gameTimeDisplay = lastWindowFrame.gameTime ? lastWindowFrame.gameTime : getElapsed(scheduleEvent.startTime, lastWindowFrame.rfc460Timestamp);
    const periodDisplay = lastWindowFrame.period ? <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>{lastWindowFrame.period}</div> : null;

    return (
        <div className="status-live-game-card">
             <div className="status-live-game-card-content">
                <h3>{eventDetails.league.name} - Best of {eventDetails.match.strategy.count}</h3>
                <div className="live-game-stats-header">
                    <div className="live-game-stats-header-team-images">
                        <div className="live-game-card-team">
                            {blueTeam.image ? <img className="live-game-card-team-image" src={blueTeam.image} alt={blueTeam.name} /> : <TeamTBDSVG className="live-game-card-team-image" />}
                            <span><h4>{blueTeam.name}</h4></span>
                            <span className='outcome'>
                                <p>{blueTeam.result.gameWins} Wins</p>
                                {blueTeamRecord && <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Record: {blueTeamRecord.wins} - {blueTeamRecord.losses}</p>}
                            </span>
                        </div>
                         <h1>
                            <div className="gamestate-bg-in-game">LIVE</div>
                             <div style={{ fontSize: '3rem', margin: '10px 0' }}>{blueScore} - {redScore}</div>
                             {periodDisplay}
                             <div style={{ fontSize: '1.5rem' }}>{gameTimeDisplay}</div>
                        </h1>
                        <div className="live-game-card-team">
                            {redTeam.image ? <img className="live-game-card-team-image" src={redTeam.image} alt={redTeam.name} /> : <TeamTBDSVG className="live-game-card-team-image" />}
                             <span><h4>{redTeam.name}</h4></span>
                             <span className='outcome'>
                                <p>{redTeam.result.gameWins} Wins</p>
                                {redTeamRecord && <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Record: {redTeamRecord.wins} - {redTeamRecord.losses}</p>}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getElapsed(startTime: Date, currentTime: string) {
    const start = new Date(startTime).getTime();
    const current = new Date(currentTime).getTime();
    const diff = current - start;
    if (diff < 0) return "00:00";

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        return `${hours}:${(minutes % 60) < 10 ? '0' : ''}${minutes % 60}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
