
import { Resource, CalendarEvent } from '@/components/ResourceTimelineCalendar';

// Helper to create ISO strings for dates
const createDate = (days: number = 0, hours: number = 0, minutes: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

// Define the three time slots for each day (morning, afternoon, evening)
const createMorningSlot = (days: number): string => createDate(days, 8, 0);
const createAfternoonSlot = (days: number): string => createDate(days, 12, 0);
const createEveningSlot = (days: number): string => createDate(days, 16, 0);
const createEndOfDay = (days: number): string => createDate(days, 20, 0);

// Sample resources
export const sampleResources: Resource[] = [
  { id: 'resource-1', title: 'Resource A' },
  { id: 'resource-2', title: 'Resource B' },
  { id: 'resource-3', title: 'Resource C' },
  { id: 'resource-4', title: 'Resource D' },
  { id: 'resource-5', title: 'Resource E' },
];

// Sample events for the three time slots across 5 days
export const sampleEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    resourceId: 'resource-1',
    title: 'Morning Meeting',
    start: createMorningSlot(0),
    end: createAfternoonSlot(0),
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
    textColor: '#ffffff'
  },
  {
    id: 'event-2',
    resourceId: 'resource-2',
    title: 'Afternoon Session',
    start: createAfternoonSlot(1),
    end: createEveningSlot(1),
    backgroundColor: '#34A853',
    borderColor: '#34A853',
    textColor: '#ffffff'
  },
  {
    id: 'event-3',
    resourceId: 'resource-3',
    title: 'Evening Review',
    start: createEveningSlot(2),
    end: createEndOfDay(2),
    backgroundColor: '#FBBC05',
    borderColor: '#FBBC05',
    textColor: '#333333'
  },
  {
    id: 'event-4',
    resourceId: 'resource-4',
    title: 'Morning Workshop',
    start: createMorningSlot(3),
    end: createAfternoonSlot(3),
    backgroundColor: '#EA4335',
    borderColor: '#EA4335',
    textColor: '#ffffff'
  },
  {
    id: 'event-5',
    resourceId: 'resource-5',
    title: 'Afternoon Training',
    start: createAfternoonSlot(4),
    end: createEveningSlot(4),
    backgroundColor: '#8E44AD',
    borderColor: '#8E44AD',
    textColor: '#ffffff'
  },
];
