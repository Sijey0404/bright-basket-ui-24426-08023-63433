import { Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromotionalBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border rounded-xl md:rounded-2xl overflow-hidden mb-8 md:mb-12 animate-fade-in">
      <div className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-3 md:p-4 bg-primary/10 rounded-full">
              <Truck className="h-8 w-8 md:h-12 md:w-12 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground px-4">
            Free Pickup & Delivery
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Experience premium laundry and dry cleaning services delivered right to your doorstep. 
            Professional care for all your garments.
          </p>

          {/* Features */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 pt-2 md:pt-4 px-4">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base text-foreground font-medium">Same Day Service</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base text-foreground font-medium">Eco-Friendly Products</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base text-foreground font-medium">Expert Care</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4 md:pt-6 px-4">
            <Button variant="cta" size="lg" className="gap-2 w-full sm:w-auto min-h-[48px]">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
