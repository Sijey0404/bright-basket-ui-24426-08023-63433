import { ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const PICKUP_FEE = 25.00;

const Cart = () => {
  const { items, removeItem, clearCart, totalItems, subtotal } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "dropby">("dropby");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const deliveryFee = deliveryMethod === "pickup" ? PICKUP_FEE : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order placed!",
      description: `Your order total is ₱${total.toFixed(2)}. We'll contact you shortly.`,
    });
    clearCart();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-9 w-9 md:h-10 md:w-10">
          <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Add items from our services to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <Card key={item.id} className="p-3">
                  <div className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.service}</p>
                      <p className="text-sm font-bold text-primary mt-1">₱{item.price.toFixed(2)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-4">
            {/* Delivery Method */}
            <div>
              <h3 className="font-semibold mb-3">Delivery Method</h3>
              <RadioGroup value={deliveryMethod} onValueChange={(value) => setDeliveryMethod(value as "pickup" | "dropby")}>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                  <RadioGroupItem value="dropby" id="dropby" />
                  <Label htmlFor="dropby" className="flex-1 cursor-pointer">
                    <div className="font-medium">Drop By</div>
                    <div className="text-xs text-muted-foreground">Bring your items to our location</div>
                    <div className="text-sm font-semibold text-primary mt-1">Free</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="font-medium">Pickup Service</div>
                    <div className="text-xs text-muted-foreground">We'll pick up from your location</div>
                    <div className="text-sm font-semibold text-primary mt-1">+₱{PICKUP_FEE.toFixed(2)}</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Price Summary */}
            <div className="space-y-2 py-3 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₱{subtotal.toFixed(2)}</span>
              </div>
              {deliveryMethod === "pickup" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pickup Fee</span>
                  <span className="font-semibold">₱{PICKUP_FEE.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">₱{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button 
                variant="cta" 
                size="lg" 
                className="w-full"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <Button 
                variant="outline" 
                size="default" 
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
