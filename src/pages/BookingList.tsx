import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CartProvider } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Package, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  pickup_date: string;
  pickup_time: string;
  service_type: string;
  special_instructions: string | null;
  status: string;
  created_at: string;
}

const BookingList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // @ts-ignore - Supabase types will regenerate  
      const { data, error } = await supabase
        // @ts-ignore - Supabase types will regenerate
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // @ts-ignore - Supabase types will regenerate
      const { error } = await supabase
        // @ts-ignore - Supabase types will regenerate
        .from("bookings")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Booking Deleted",
        description: "The booking has been removed successfully.",
      });

      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete booking",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading bookings...</p>
            </div>
          </main>
          <Footer />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Bookings</h1>
              <p className="text-muted-foreground mt-2">View and manage your laundry bookings</p>
            </div>
            <Button onClick={() => navigate("/booking")} variant="cta">
              New Booking
            </Button>
          </div>

          {bookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">Create your first booking to get started</p>
                <Button onClick={() => navigate("/booking")} variant="cta">
                  Create Booking
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{booking.customer_name}</CardTitle>
                        <CardDescription className="mt-1">
                          Booked on {format(new Date(booking.created_at), "MMM dd, yyyy")}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(booking.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Pickup Date</p>
                            <p className="text-muted-foreground">
                              {format(new Date(booking.pickup_date), "EEEE, MMMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Pickup Time</p>
                            <p className="text-muted-foreground">{booking.pickup_time}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Package className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Service Type</p>
                            <p className="text-muted-foreground">{booking.service_type}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Pickup Address</p>
                            <p className="text-muted-foreground">{booking.address}</p>
                          </div>
                        </div>
                        {booking.special_instructions && (
                          <div>
                            <p className="font-semibold text-sm mb-1">Special Instructions</p>
                            <p className="text-muted-foreground text-sm">
                              {booking.special_instructions}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default BookingList;
