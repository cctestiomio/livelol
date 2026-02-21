import './styles/scheduleStyle.css'
import { EventCard } from "./EventCard";
import { ScheduleEvent } from "../types/baseTypes";
import { getCS2Schedule } from "../../utils/CS2API";
import { useEffect, useState } from "react";

export function CS2Schedule() {

    const [liveEvents, setLiveEvents] = useState<ScheduleEvent[]>([])
    const [upcomingEvents, setUpcomingEvents] = useState<ScheduleEvent[]>([])
    const [recentEvents, setRecentEvents] = useState<ScheduleEvent[]>([])

    useEffect(() => {
        getCS2Schedule().then(events => {
            setLiveEvents(events.filter(e => e.state === "inProgress"))
            setUpcomingEvents(events.filter(e => e.state === "unstarted"))
            setRecentEvents(events.filter(e => e.state === "completed"))
        })
    }, [])

    let scheduledEvents = [
        {
            emptyMessage: 'No Live Matches',
            scheduleEvents: liveEvents,
            title: 'Live Matches',
        },
        {
            emptyMessage: 'No Upcoming Matches',
            scheduleEvents: upcomingEvents,
            title: 'Upcoming Matches',
        },
        {
            emptyMessage: 'No Recent Matches',
            scheduleEvents: recentEvents,
            title: 'Recent Matches',
        }
    ]

    return (
        <div className="orders-container">
            {scheduledEvents.map(scheduledEvent => (
                <EventCards key={scheduledEvent.title} emptyMessage={scheduledEvent.emptyMessage} scheduleEvents={scheduledEvent.scheduleEvents} title={scheduledEvent.title} />
            ))}
        </div>
    );
}

type EventCardProps = {
    emptyMessage: string;
    scheduleEvents: ScheduleEvent[];
    title: string;
}

function EventCards({ emptyMessage, scheduleEvents, title }: EventCardProps) {
    if (scheduleEvents !== undefined && scheduleEvents.length !== 0) {
        return (
            <div>
                <h2 className="games-of-day">{title}</h2>
                <div className="games-list-container">
                    <div className="games-list-items">
                        {scheduleEvents.map(scheduleEvent => {
                            return (
                                <EventCard
                                    key={`${scheduleEvent.match.id}_${scheduleEvent.startTime}`}
                                    scheduleEvent={scheduleEvent}
                                />
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <h2 className="games-of-day">{emptyMessage}</h2>
        );
    }
}
