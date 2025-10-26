import { Shirt, BedDouble, Sparkles, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

// Import wash & fold images
import jacketImg from "@/assets/wash-fold/jacket.jpg";
import tshirtImg from "@/assets/wash-fold/tshirt.jpg";
import jeansImg from "@/assets/wash-fold/jeans.jpg";
import dressShirtImg from "@/assets/wash-fold/dress-shirt.jpg";
import poloImg from "@/assets/wash-fold/polo.jpg";
import hoodieImg from "@/assets/wash-fold/hoodie.jpg";
import sweaterImg from "@/assets/wash-fold/sweater.jpg";
import pantsImg from "@/assets/wash-fold/pants.jpg";
import shortsImg from "@/assets/wash-fold/shorts.jpg";
import skirtImg from "@/assets/wash-fold/skirt.jpg";

// Import comforters images
import twinComforterImg from "@/assets/comforters/twin-comforter.jpg";
import queenComforterImg from "@/assets/comforters/queen-comforter.jpg";
import kingComforterImg from "@/assets/comforters/king-comforter.jpg";
import duvetImg from "@/assets/comforters/duvet.jpg";
import blanketImg from "@/assets/comforters/blanket.jpg";
import quiltImg from "@/assets/comforters/quilt.jpg";
import bedspreadImg from "@/assets/comforters/bedspread.jpg";
import throwImg from "@/assets/comforters/throw.jpg";
import sleepingBagImg from "@/assets/comforters/sleeping-bag.jpg";
import pillowImg from "@/assets/comforters/pillow.jpg";

// Import dry cleaning images
import suitJacketImg from "@/assets/dry-cleaning/suit-jacket.jpg";
import dressPantsImg from "@/assets/dry-cleaning/dress-pants.jpg";
import dressImg from "@/assets/dry-cleaning/dress.jpg";
import gownImg from "@/assets/dry-cleaning/gown.jpg";
import blazerImg from "@/assets/dry-cleaning/blazer.jpg";
import coatImg from "@/assets/dry-cleaning/coat.jpg";
import trenchCoatImg from "@/assets/dry-cleaning/trench-coat.jpg";
import silkBlouseImg from "@/assets/dry-cleaning/silk-blouse.jpg";
import woolSweaterImg from "@/assets/dry-cleaning/wool-sweater.jpg";
import tieImg from "@/assets/dry-cleaning/tie.jpg";

interface ServiceItem {
  name: string;
  price: string;
  image: string;
}

interface Service {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  price: string;
  items: ServiceItem[];
}

const services: Service[] = [
  {
    id: 1,
    name: "WASH & FOLD",
    icon: <Shirt className="h-12 w-12" />,
    description: "Professional washing, drying, and folding service for your everyday clothes",
    price: "From ₱1.50/lb",
    items: [
      { name: "Denim Jacket", price: "₱6.50", image: jacketImg },
      { name: "T-Shirt", price: "₱2.50", image: tshirtImg },
      { name: "Jeans", price: "₱5.00", image: jeansImg },
      { name: "Dress Shirt", price: "₱4.50", image: dressShirtImg },
      { name: "Polo Shirt", price: "₱3.50", image: poloImg },
      { name: "Hoodie", price: "₱7.00", image: hoodieImg },
      { name: "Sweater", price: "₱5.50", image: sweaterImg },
      { name: "Pants", price: "₱4.50", image: pantsImg },
      { name: "Shorts", price: "₱3.00", image: shortsImg },
      { name: "Skirt", price: "₱4.00", image: skirtImg },
    ],
  },
  {
    id: 2,
    name: "COMFORTERS",
    icon: <BedDouble className="h-12 w-12" />,
    description: "Special care for your bulky items including comforters, blankets, and duvets",
    price: "From ₱25/item",
    items: [
      { name: "Twin Comforter", price: "₱25.00", image: twinComforterImg },
      { name: "Queen Comforter", price: "₱35.00", image: queenComforterImg },
      { name: "King Comforter", price: "₱45.00", image: kingComforterImg },
      { name: "Duvet Cover", price: "₱30.00", image: duvetImg },
      { name: "Blanket", price: "₱20.00", image: blanketImg },
      { name: "Quilt", price: "₱28.00", image: quiltImg },
      { name: "Bedspread", price: "₱32.00", image: bedspreadImg },
      { name: "Throw Blanket", price: "₱15.00", image: throwImg },
      { name: "Sleeping Bag", price: "₱25.00", image: sleepingBagImg },
      { name: "Pillow", price: "₱12.00", image: pillowImg },
    ],
  },
  {
    id: 3,
    name: "DRY CLEANING",
    icon: <Sparkles className="h-12 w-12" />,
    description: "Expert dry cleaning for delicate fabrics, suits, dresses, and formal wear",
    price: "From ₱8/item",
    items: [
      { name: "Suit Jacket", price: "₱12.00", image: suitJacketImg },
      { name: "Dress Pants", price: "₱8.00", image: dressPantsImg },
      { name: "Dress", price: "₱15.00", image: dressImg },
      { name: "Formal Gown", price: "₱25.00", image: gownImg },
      { name: "Blazer", price: "₱11.00", image: blazerImg },
      { name: "Winter Coat", price: "₱18.00", image: coatImg },
      { name: "Trench Coat", price: "₱16.00", image: trenchCoatImg },
      { name: "Silk Blouse", price: "₱10.00", image: silkBlouseImg },
      { name: "Wool Sweater", price: "₱9.00", image: woolSweaterImg },
      { name: "Necktie", price: "₱6.00", image: tieImg },
    ],
  },
  {
    id: 4,
    name: "EXPRESS",
    icon: <Zap className="h-12 w-12" />,
    description: "Same-day service for when you need your laundry done fast",
    price: "24-hour turnaround",
    items: [
      { name: "Denim Jacket", price: "₱10.00", image: jacketImg },
      { name: "T-Shirt", price: "₱4.50", image: tshirtImg },
      { name: "Jeans", price: "₱8.00", image: jeansImg },
      { name: "Dress Shirt", price: "₱7.00", image: dressShirtImg },
      { name: "Polo Shirt", price: "₱5.50", image: poloImg },
      { name: "Hoodie", price: "₱11.00", image: hoodieImg },
      { name: "Sweater", price: "₱8.50", image: sweaterImg },
      { name: "Pants", price: "₱7.00", image: pantsImg },
      { name: "Shorts", price: "₱5.00", image: shortsImg },
      { name: "Skirt", price: "₱6.50", image: skirtImg },
    ],
  },
];

const ServicesGrid = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleServiceClick = (serviceId: number) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleItemClick = (item: ServiceItem, serviceName: string) => {
    const priceValue = parseFloat(item.price.replace('₱', ''));
    addItem({
      id: item.name,
      name: item.name,
      price: priceValue,
      image: item.image,
      service: serviceName,
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <section className="mb-12 md:mb-16 animate-slide-up">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">Our Services</h2>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="space-y-3">
            <Card
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-primary"
              onClick={() => handleServiceClick(service.id)}
            >
              <CardContent className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {service.description}
                    </p>
                    <p className="text-xs font-semibold text-primary mt-1">
                      {service.price}
                    </p>
                  </div>
                </div>
                <div className="text-muted-foreground">
                  {expandedService === service.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardContent>
            </Card>
            
            {expandedService === service.id && (
              <div className="animate-fade-in bg-card border-2 border-primary rounded-lg p-4 sm:p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Available Items</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                  {service.items.map((item, index) => (
                    <Card 
                      key={index} 
                      className="group hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => handleItemClick(item, service.name)}
                    >
                      <CardContent className="p-3 flex flex-col items-center gap-2">
                        <div className="w-full aspect-square rounded-md overflow-hidden bg-muted">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <h5 className="text-xs font-semibold text-foreground text-center line-clamp-2">
                          {item.name}
                        </h5>
                        <p className="text-xs font-bold text-primary">
                          {item.price}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
