
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CalendarToolbarProps {
  onAddEvent: () => void;
}

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({ onAddEvent }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-medium tracking-tight">Resource Timeline</h2>
      <Button 
        onClick={onAddEvent} 
        size="sm" 
        className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white shadow-sm transition-all duration-300"
      >
        <Plus size={16} />
        <span>Add Event</span>
      </Button>
    </div>
  );
};

export default CalendarToolbar;
