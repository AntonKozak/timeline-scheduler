
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, X } from 'lucide-react';
import { Resource, CalendarEvent } from './types';

interface EventModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentEvent: Partial<CalendarEvent> | null;
  setCurrentEvent: (event: Partial<CalendarEvent> | null) => void;
  isEditing: boolean;
  resources: Resource[];
  onSave: () => void;
  onDelete: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onOpenChange,
  currentEvent,
  setCurrentEvent,
  isEditing,
  resources,
  onSave,
  onDelete
}) => {
  useEffect(() => {
    if (isOpen) {
      console.log('Event modal opened with data:', currentEvent);
      console.log('Editing mode:', isEditing ? 'Edit existing' : 'Create new');
      console.log('Available resources for selection:', resources);
    }
  }, [isOpen, currentEvent, isEditing, resources]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onChange={(e) => {
                console.log('Title changed:', e.target.value);
                setCurrentEvent({ ...currentEvent!, title: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resource" className="text-right">
              Resource
            </Label>
            <Select 
              value={currentEvent?.resourceId} 
              onValueChange={(value) => {
                console.log('Resource selected:', value);
                setCurrentEvent({ ...currentEvent!, resourceId: value });
              }}
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
              onChange={(e) => {
                console.log('Start time changed:', e.target.value);
                setCurrentEvent({ 
                  ...currentEvent!, 
                  start: new Date(e.target.value).toISOString() 
                });
              }}
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
              onChange={(e) => {
                console.log('End time changed:', e.target.value);
                setCurrentEvent({ 
                  ...currentEvent!, 
                  end: new Date(e.target.value).toISOString() 
                });
              }}
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
              onChange={(e) => {
                console.log('Color changed:', e.target.value);
                setCurrentEvent({ 
                  ...currentEvent!, 
                  backgroundColor: e.target.value,
                  borderColor: e.target.value
                });
              }}
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          {isEditing && (
            <Button 
              variant="destructive" 
              onClick={() => {
                console.log('Delete button clicked for event:', currentEvent?.id);
                onDelete();
              }}
              className="flex items-center gap-1"
            >
              <X size={16} />
              Delete
            </Button>
          )}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                console.log('Cancel button clicked, closing modal');
                onOpenChange(false);
              }}
              className="flex items-center gap-1"
            >
              <X size={16} />
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={() => {
                console.log('Save/Update button clicked with data:', currentEvent);
                onSave();
              }}
              className="flex items-center gap-1 bg-primary hover:bg-primary/90"
            >
              <Calendar size={16} />
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
