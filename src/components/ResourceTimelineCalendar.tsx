
import React from 'react';
import CalendarToolbar from './calendar/CalendarToolbar';
import CalendarView from './calendar/CalendarView';
import EventModal from './calendar/EventModal';
import DeleteConfirmationModal from './calendar/DeleteConfirmationModal';
import { useCalendarEvents } from './calendar/useCalendarEvents';
import { ResourceTimelineCalendarProps } from './calendar/types';

export { Resource, CalendarEvent } from './calendar/types';

const ResourceTimelineCalendar: React.FC<ResourceTimelineCalendarProps> = ({
  initialResources = [],
  initialEvents = [],
  onEventChange,
  onEventAdd,
  onEventDelete
}) => {
  const {
    resources,
    events,
    currentEvent,
    setCurrentEvent,
    isEditing,
    showEventModal,
    setShowEventModal,
    showDeleteModal,
    setShowDeleteModal,
    handleDateClick,
    handleEventClick,
    handleEventDrop,
    handleEventResize,
    handleSaveEvent,
    confirmDeleteEvent,
    handleAddEventClick
  } = useCalendarEvents(
    initialResources,
    initialEvents,
    onEventChange,
    onEventAdd,
    onEventDelete
  );

  return (
    <div className="resource-timeline-calendar w-full h-full">
      <CalendarToolbar onAddEvent={handleAddEventClick} />
      
      <CalendarView
        resources={resources}
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
      />

      <EventModal
        isOpen={showEventModal}
        onOpenChange={setShowEventModal}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        isEditing={isEditing}
        resources={resources}
        onSave={handleSaveEvent}
        onDelete={() => setShowDeleteModal(true)}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={confirmDeleteEvent}
      />
    </div>
  );
};

export default ResourceTimelineCalendar;
