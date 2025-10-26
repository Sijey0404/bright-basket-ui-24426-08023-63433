import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CartProvider } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

const Booking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const pickupDate = formData.get("pickupDate") as string;
    const pickupTime = formData.get("pickupTime") as string;
    const serviceType = formData.get("serviceType") as string;
    const notes = formData.get("notes") as string;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to make a booking.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        navigate("/auth");
        return;
      }

      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        customer_name: `${firstName} ${lastName}`,
        email,
        phone,
        address,
        pickup_date: pickupDate,
        pickup_time: pickupTime,
        service_type: serviceType,
        special_instructions: notes || null,
      });

      if (error) throw error;

      toast({
        title: "Booking Confirmed!",
        description: "We'll contact you shortly to confirm your pickup details.",
      });
      navigate("/booking-list");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 md:py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Online Booking Form</CardTitle>
              <CardDescription>Schedule your laundry pick up and delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" required placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" required placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="+1 (555) 000-0000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Pickup Address *</Label>
                  <Textarea id="address" name="address" required placeholder="123 Main St, Apt 4B" rows={3} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">Pickup Date *</Label>
                    <Input id="pickupDate" name="pickupDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Pickup Time *</Label>
                    <Select name="pickupTime" required>
                      <SelectTrigger id="pickupTime">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</SelectItem>
                        <SelectItem value="Afternoon (12PM - 5PM)">Afternoon (12PM - 5PM)</SelectItem>
                        <SelectItem value="Evening (5PM - 8PM)">Evening (5PM - 8PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select name="serviceType" required>
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wash & Fold">Wash & Fold</SelectItem>
                      <SelectItem value="Dry Cleaning">Dry Cleaning</SelectItem>
                      <SelectItem value="Comforters">Comforters</SelectItem>
                      <SelectItem value="All Services">All Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions</Label>
                  <Textarea id="notes" name="notes" placeholder="Any special requests or notes..." rows={3} />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" variant="cta" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Booking"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Booking;
