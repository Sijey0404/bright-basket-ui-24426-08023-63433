import { WashingMachine, User, Plus, Menu, LogOut } from "lucide-react";
import blobLogo from "@/assets/blob-logo.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Cart from "@/components/Cart";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Logged out",
        description: "You've been successfully logged out."
      });
      navigate("/auth");
    }
  };
  return <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <img src={blobLogo} alt="Blob Laundry Shop" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
            <div className="flex flex-col">
              
              <span className="text-xs md:text-sm text-muted-foreground font-medium">LAUNDRY SHOP</span>
            </div>
          </div>

          {/* Center Navigation - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-6">
            <Button variant="ghost" size="default" className="font-medium" onClick={() => scrollToSection('home')}>
              Home
            </Button>
            <Button variant="ghost" size="default" className="font-medium" onClick={() => scrollToSection('services')}>
              Services
            </Button>
            <Button variant="ghost" size="default" className="font-medium" onClick={() => scrollToSection('pricing')}>
              Pricing
            </Button>
            <Button variant="ghost" size="default" className="font-medium" onClick={() => navigate('/booking-list')}>
              Booking List
            </Button>
            <Button variant="ghost" size="default" className="font-medium" onClick={() => scrollToSection('faq')}>
              FAQ
            </Button>
          </nav>

          {/* Right Side - CTA and Profile */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <img src={blobLogo} alt="Blob Laundry Shop" className="h-6 w-6 object-contain" />
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Button variant="ghost" size="lg" className="justify-start font-medium text-base" onClick={() => scrollToSection('home')}>
                    Home
                  </Button>
                  <Button variant="ghost" size="lg" className="justify-start font-medium text-base" onClick={() => scrollToSection('services')}>
                    Services
                  </Button>
                  <Button variant="ghost" size="lg" className="justify-start font-medium text-base" onClick={() => scrollToSection('pricing')}>
                    Pricing
                  </Button>
                  <Button variant="ghost" size="lg" className="justify-start font-medium text-base" onClick={() => { setMobileMenuOpen(false); navigate('/booking-list'); }}>
                    Booking List
                  </Button>
                  <Button variant="ghost" size="lg" className="justify-start font-medium text-base" onClick={() => scrollToSection('faq')}>
                    FAQ
                  </Button>
                  <div className="border-t border-border pt-4 mt-4">
                    <Button variant="cta" size="lg" className="w-full gap-2" onClick={() => { setMobileMenuOpen(false); navigate("/booking"); }}>
                      <Plus className="h-4 w-4" />
                      Place New Order
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* CTA Button - Hidden on mobile */}
            <Button variant="cta" size="default" className="gap-2 hidden md:flex" onClick={() => navigate("/booking")}>
              <Plus className="h-4 w-4" />
              <span className="hidden lg:inline">Place New Order</span>
              <span className="lg:hidden">Order</span>
            </Button>
            
            {/* Cart */}
            <Cart />
            
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 md:h-10 md:w-10">
                  <User className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card z-50">
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;