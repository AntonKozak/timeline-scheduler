
import React, { useState } from 'react';
import ResourceTimelineCalendar, { Resource, CalendarEvent } from '@/components/ResourceTimelineCalendar';
import { sampleResources, sampleEvents } from '@/data/calendarData';
import { toast } from 'sonner';

const Index = () => {
  const [resources] = useState<Resource[]>(sampleResources);
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

  const handleEventChange = (updatedEvent: CalendarEvent) => {
    console.log('Event changed:', updatedEvent);
    setEvents(prev => prev.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const handleEventAdd = (newEvent: CalendarEvent) => {
    console.log('Event added:', newEvent);
    setEvents(prev => [...prev, newEvent]);
  };

  const handleEventDelete = (eventId: string) => {
    console.log('Event deleted:', eventId);
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Resource Management
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Weekly Resource Timeline
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Efficiently manage and schedule your resources with our interactive timeline. 
            Drag and drop events, resize them, or create new ones with a simple click.
          </p>
        </header>

        <div className="rounded-xl border bg-card p-4 shadow-sm md:p-6">
          <ResourceTimelineCalendar
            initialResources={resources}
            initialEvents={events}
            onEventChange={handleEventChange}
            onEventAdd={handleEventAdd}
            onEventDelete={handleEventDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
