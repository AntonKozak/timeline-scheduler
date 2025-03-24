
import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Types
export interface Resource {
  id: string;
  title: string;
  [key: string]: any;
}

export interface CalendarEvent {
  id: string;
  resourceId: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  [key: string]: any;
}

interface ResourceTimelineCalendarProps {
  initialResources?: Resource[];
  initialEvents?: CalendarEvent[];
  onEventChange?: (event: CalendarEvent) => void;
  onEventAdd?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
}

const ResourceTimelineCalendar: React.FC<ResourceTimelineCalendarProps> = ({
  initialResources = [],
  initialEvents = [],
  onEventChange,
  onEventAdd,
  onEventDelete
}) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const handleDateClick = (arg: any) => {
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
      setEvents((prev) => prev.map(event => event.id === newEvent.id ? newEvent : event));
      if (onEventChange) {
        onEventChange(newEvent);
      }
      toast.success('Event updated successfully');
    } else {
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

  return (
    <div className="resource-timeline-calendar w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium tracking-tight">Resource Timeline</h2>
        <Button 
          onClick={handleAddEventClick} 
          size="sm" 
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white shadow-sm transition-all duration-300"
        >
          <Plus size={16} />
          <span>Add Event</span>
        </Button>
      </div>
      
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
          slotDuration="01:00:00"
          slotLabelInterval="01:00:00"
          slotMinWidth={70}
          resources={resources}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          resourceAreaHeaderContent="Resources"
          allDaySlot={false}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
          }}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
          }}
        />
      </div>

      {/* Event Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="sm:max-w-[425px] animate-slide-in">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Make changes to your event here.' 
                : 'Fill in the details for your new event.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Event title"
                className="col-span-3"
                value={currentEvent?.title || ''}
                onChange={(e) => setCurrentEvent({ ...currentEvent!, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resource" className="text-right">
                Resource
              </Label>
              <Select 
                value={currentEvent?.resourceId} 
                onValueChange={(value) => setCurrentEvent({ ...currentEvent!, resourceId: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a resource" />
                </SelectTrigger>
                <SelectContent>
                  {resources.map((resource) => (
                    <SelectItem key={resource.id} value={resource.id}>
                      {resource.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">
                Start
              </Label>
              <Input
                id="start"
                type="datetime-local"
                className="col-span-3"
                value={currentEvent?.start ? new Date(currentEvent.start).toISOString().slice(0, 16) : ''}
                onChange={(e) => setCurrentEvent({ 
                  ...currentEvent!, 
                  start: new Date(e.target.value).toISOString() 
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                End
              </Label>
              <Input
                id="end"
                type="datetime-local"
                className="col-span-3"
                value={currentEvent?.end ? new Date(currentEvent.end).toISOString().slice(0, 16) : ''}
                onChange={(e) => setCurrentEvent({ 
                  ...currentEvent!, 
                  end: new Date(e.target.value).toISOString() 
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <Input
                id="color"
                type="color"
                className="col-span-3 h-10"
                value={currentEvent?.backgroundColor || '#3788d8'}
                onChange={(e) => setCurrentEvent({ 
                  ...currentEvent!, 
                  backgroundColor: e.target.value,
                  borderColor: e.target.value
                })}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            {isEditing && (
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-1"
              >
                <Trash2 size={16} />
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowEventModal(false)}
                className="flex items-center gap-1"
              >
                <X size={16} />
                Cancel
              </Button>
              <Button 
                type="submit" 
                onClick={handleSaveEvent}
                className="flex items-center gap-1 bg-primary hover:bg-primary/90"
              >
                <Calendar size={16} />
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px] animate-slide-in">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteEvent}
              className="flex items-center gap-1"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourceTimelineCalendar;
