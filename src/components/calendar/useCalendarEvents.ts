
import { useState, useEffect } from 'react';
import { Resource, CalendarEvent } from './types';
import { toast } from 'sonner';

export const useCalendarEvents = (
  initialResources: Resource[],
  initialEvents: CalendarEvent[],
  onEventChange?: (event: CalendarEvent) => void,
  onEventAdd?: (event: CalendarEvent) => void,
  onEventDelete?: (eventId: string) => void
) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentEvent, setCurrentEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    console.log('Resources updated:', initialResources);
    setResources(initialResources);
  }, [initialResources]);

  useEffect(() => {
    console.log('Events updated:', initialEvents);
    setEvents(initialEvents);
  }, [initialEvents]);

  const handleDateClick = (arg: any) => {
    console.log('Date clicked:', arg);
    const resourceId = arg.resource ? arg.resource.id : '';
    setCurrentEvent({
      start: arg.dateStr,
      end: new Date(new Date(arg.dateStr).getTime() + 3600000).toISOString(), // 1 hour later
      resourceId,
      title: '',
      backgroundColor: '#3788d8'
    });
    setIsEditing(false);
    setShowEventModal(true);
  };

  const handleEventClick = (arg: any) => {
    console.log('Event clicked:', arg.event);
    setCurrentEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.startStr,
      end: arg.event.endStr,
      resourceId: arg.event.getResources()[0]?.id || '',
      backgroundColor: arg.event.backgroundColor
    });
    setIsEditing(true);
    setShowEventModal(true);
  };

  const handleEventDrop = (arg: any) => {
    console.log('Event dropped:', arg.event);
    console.log('Old start:', arg.oldEvent.startStr, 'New start:', arg.event.startStr);
    console.log('Old resource:', arg.oldEvent.getResources()[0]?.id, 'New resource:', arg.event.getResources()[0]?.id);
    
    const resource = arg.event.getResources()[0];
    const updatedEvent = {
      id: arg.event.id,
      resourceId: resource ? resource.id : '',
      title: arg.event.title,
      start: arg.event.startStr,
      end: arg.event.endStr,
      backgroundColor: arg.event.backgroundColor,
      borderColor: arg.event.borderColor,
      textColor: arg.event.textColor
    };

    setEvents((prev) => prev.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    
    if (onEventChange) {
      onEventChange(updatedEvent);
    }

    toast.success('Event updated successfully');
  };

  const handleEventResize = (arg: any) => {
    console.log('Event resized:', arg.event);
    console.log('Old end:', arg.oldEvent.endStr, 'New end:', arg.event.endStr);
    
    const resource = arg.event.getResources()[0];
    const updatedEvent = {
      id: arg.event.id,
      resourceId: resource ? resource.id : '',
      title: arg.event.title,
      start: arg.event.startStr,
      end: arg.event.endStr,
      backgroundColor: arg.event.backgroundColor,
      borderColor: arg.event.borderColor,
      textColor: arg.event.textColor
    };

    setEvents((prev) => prev.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    
    if (onEventChange) {
      onEventChange(updatedEvent);
    }

    toast.success('Event updated successfully');
  };

  const handleSaveEvent = () => {
    console.log('Saving event:', currentEvent);
    
    if (!currentEvent || !currentEvent.title || !currentEvent.resourceId) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newEvent = {
      id: currentEvent.id || `event-${Date.now()}`,
      resourceId: currentEvent.resourceId,
      title: currentEvent.title,
      start: currentEvent.start || new Date().toISOString(),
      end: currentEvent.end || new Date(new Date().getTime() + 3600000).toISOString(),
      backgroundColor: currentEvent.backgroundColor || '#3788d8',
      borderColor: currentEvent.backgroundColor || '#3788d8',
      textColor: '#ffffff'
    };

    if (isEditing) {
      console.log('Updating existing event:', newEvent);
      setEvents((prev) => prev.map(event => event.id === newEvent.id ? newEvent : event));
      if (onEventChange) {
        onEventChange(newEvent);
      }
      toast.success('Event updated successfully');
    } else {
      console.log('Adding new event:', newEvent);
      setEvents((prev) => [...prev, newEvent]);
      if (onEventAdd) {
        onEventAdd(newEvent);
      }
      toast.success('Event added successfully');
    }

    setShowEventModal(false);
    setCurrentEvent(null);
  };

  const confirmDeleteEvent = () => {
    console.log('Deleting event with ID:', currentEvent?.id);
    
    if (currentEvent && currentEvent.id) {
      setEvents((prev) => prev.filter(event => event.id !== currentEvent.id));
      
      if (onEventDelete && currentEvent.id) {
        onEventDelete(currentEvent.id);
      }
      
      toast.success('Event deleted successfully');
    }
    
    setShowDeleteModal(false);
    setShowEventModal(false);
    setCurrentEvent(null);
  };

  const handleAddEventClick = () => {
    console.log('Add event button clicked');
    console.log('Available resources:', resources);
    
    setCurrentEvent({
      start: new Date().toISOString(),
      end: new Date(new Date().getTime() + 3600000).toISOString(),
      resourceId: resources.length > 0 ? resources[0].id : '',
      title: '',
      backgroundColor: '#3788d8'
    });
    setIsEditing(false);
    setShowEventModal(true);
  };

  return {
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
  };
};
