
import { Resource, CalendarEvent } from '@/components/ResourceTimelineCalendar';

// Helper to create ISO strings for dates
const createDate = (days: number = 0, hours: number = 0, minutes: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

// Sample resources
export const sampleResources: Resource[] = [
  { id: 'resource-1', title: 'Resource A' },
  { id: 'resource-2', title: 'Resource B' },
  { id: 'resource-3', title: 'Resource C' },
  { id: 'resource-4', title: 'Resource D' },
  { id: 'resource-5', title: 'Resource E' },
];

// Sample events spanning this week
export const sampleEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    resourceId: 'resource-1',
    title: 'Project Meeting',
    start: createDate(0, 10, 0),
    end: createDate(0, 12, 0),
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
    textColor: '#ffffff'
  },
  {
    id: 'event-2',
    resourceId: 'resource-2',
    title: 'Design Review',
    start: createDate(1, 14, 0),
    end: createDate(1, 16, 0),
    backgroundColor: '#34A853',
    borderColor: '#34A853',
    textColor: '#ffffff'
  },
  {
    id: 'event-3',
    resourceId: 'resource-3',
    title: 'Development Sprint',
    start: createDate(2, 9, 0),
    end: createDate(2, 17, 0),
    backgroundColor: '#FBBC05',
    borderColor: '#FBBC05',
    textColor: '#333333'
  },
  {
    id: 'event-4',
    resourceId: 'resource-4',
    title: 'Client Presentation',
    start: createDate(3, 11, 0),
    end: createDate(3, 13, 0),
    backgroundColor: '#EA4335',
    borderColor: '#EA4335',
    textColor: '#ffffff'
  },
  {
    id: 'event-5',
    resourceId: 'resource-5',
    title: 'Team Building',
    start: createDate(4, 15, 0),
    end: createDate(4, 18, 0),
    backgroundColor: '#8E44AD',
    borderColor: '#8E44AD',
    textColor: '#ffffff'
  },
];
