
import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { Resource, CalendarEvent } from './types';

interface CalendarViewProps {
  resources: Resource[];
  events: CalendarEvent[];
  onDateClick: (arg: any) => void;
  onEventClick: (arg: any) => void;
  onEventDrop: (arg: any) => void;
  onEventResize: (arg: any) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  resources,
  events,
  onDateClick,
  onEventClick,
  onEventDrop,
  onEventResize
}) => {
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    console.log('Calendar rendered with resources:', resources);
    console.log('Calendar rendered with events:', events);
  }, [resources, events]);

  return (
    <div className="calendar-container overflow-hidden rounded-xl border animate-fade-in">
      <FullCalendar
        ref={calendarRef}
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        resourceAreaWidth="15%"
        height="auto"
        duration={{ days: 5 }}
        slotDuration="08:00:00"
        slotLabelInterval="08:00:00"
        slotMinWidth={150}
        resources={resources}
        events={events}
        dateClick={onDateClick}
        eventClick={onEventClick}
        eventDrop={onEventDrop}
        eventResize={onEventResize}
        resourceAreaHeaderContent="Resources"
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false
        }}
        views={{
          resourceTimelineWeek: {
            type: 'resourceTimeline',
            duration: { days: 5 },
            slotDuration: '08:00:00',
            slotLabelFormat: [
              { weekday: 'short', day: 'numeric' },
              { hour: '2-digit', minute: '2-digit' }
            ]
          }
        }}
        datesSet={(dateInfo) => {
          console.log('Calendar date range changed:', {
            start: dateInfo.start,
            end: dateInfo.end,
            view: dateInfo.view.type
          });
        }}
      />
    </div>
  );
};

export default CalendarView;
