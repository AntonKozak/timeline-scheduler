
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

export interface ResourceTimelineCalendarProps {
  initialResources?: Resource[];
  initialEvents?: CalendarEvent[];
  onEventChange?: (event: CalendarEvent) => void;
  onEventAdd?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
}
