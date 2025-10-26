import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { format, addDays } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface TimeSlot {
  id: number;
  day: string;
  date: string;
  fullDate: Date;
  time: string;
}

const generateTimeSlots = (): TimeSlot[] => {
  const today = new Date();
  return Array.from({ length: 3 }, (_, i) => {
    const slotDate = addDays(today, i);
    return {
      id: i + 1,
      day: format(slotDate, "EEE").toUpperCase(),
      date: format(slotDate, "MMM dd").toUpperCase(),
      fullDate: slotDate,
      time: "9 AM - 11 AM",
    };
  });
};

const PickupSlots = () => {
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (selectedSlot) {
      toast({
        title: "Pickup Date Confirmed",
        description: `Your pickup is scheduled for ${selectedSlot.day}, ${selectedSlot.date} at ${selectedSlot.time}`,
      });
    }
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedSlot(null);
  };
  return (
    <section className="animate-slide-up animation-delay-200 mb-12 md:mb-16">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6 md:h-7 md:w-7 text-primary" />
          Schedule Your Pickup
        </h2>
        <p className="text-sm md:text-base text-muted-foreground px-4">Select your preferred pickup time slot</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {timeSlots.map((slot) => (
          <Card
            key={slot.id}
            onClick={() => handleSlotClick(slot)}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-accent active:scale-95"
          >
            <CardContent className="p-4 sm:p-5 md:p-6 min-h-[100px] flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary group-hover:text-accent transition-colors">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <p className="font-bold text-base md:text-lg">{slot.day}, {slot.date}</p>
                </div>
                <p className="text-xl md:text-2xl font-semibold text-foreground">{slot.time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Set this pickup date?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedSlot && (
                <>
                  Do you want to schedule your pickup for <strong>{selectedSlot.day}, {selectedSlot.date}</strong> at <strong>{selectedSlot.time}</strong>?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default PickupSlots;
