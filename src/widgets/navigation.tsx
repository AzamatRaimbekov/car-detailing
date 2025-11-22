import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "../shared/ui";
import { scrollToElement, trackEvent } from "../shared/lib/utils";
import { Logo } from "../shared/logo";

const navItems = [
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "portfolio", label: "Portfolio" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Contacts" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionChange = () => {
      const sections = navItems.map((item) => item.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionChange);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    trackEvent("nav_click", { section: sectionId });
    scrollToElement(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleBookingClick = () => {
    trackEvent("cta_click", { source: "navigation", action: "booking" });
    scrollToElement("booking");
    setIsMobileMenuOpen(false);
  };

  const handlePhoneClick = () => {
    trackEvent("cta_click", { source: "navigation", action: "phone" });
    window.location.href = "tel:+996555123456";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto container-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <img 
                src="/logo.svg" 
                alt="SHINE PORT Logo" 
                className="h-12 w-auto"
              />
              <div>
                <div className={`text-xl font-bold transition-colors ${
                  isScrolled ? 'text-graphite-900' : 'text-white'
                }`}>
                  SHINE PORT
                </div>
                <p className={`text-sm transition-colors ${
                  isScrolled ? 'text-graphite-600' : 'text-white/80'
                }`}>
                  America
                </p>
              </div>
            </motion.div> */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-medium transition-colors hover:text-gold-500 ${
                    activeSection === item.id
                      ? "text-gold-500"
                      : isScrolled
                      ? "text-graphite-700"
                      : "text-white/90"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePhoneClick}
                className={`${
                  isScrolled
                    ? "text-graphite-700 hover:text-gold-500"
                    : "text-white hover:text-gold-200"
                }`}
              >
                <Phone className="w-4 h-4 mr-2" />
                +996 555 123 456
              </Button>
              <Button
                variant={isScrolled ? "liquid" : "glass"}
                onClick={handleBookingClick}
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden ${
                isScrolled
                  ? "text-graphite-700 hover:text-gold-500"
                  : "text-white hover:text-gold-200"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden"
          >
            <div className="bg-white/95 backdrop-blur-md shadow-xl border-t border-graphite-200">
              <div className="container mx-auto container-padding py-6">
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors ${
                        activeSection === item.id
                          ? "bg-gold-50 text-gold-600"
                          : "text-graphite-700 hover:bg-graphite-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}

                  <div className="pt-4 border-t border-graphite-200 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handlePhoneClick}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      +996 555 123 456
                    </Button>
                    <Button
                      variant="liquid"
                      className="w-full"
                      onClick={handleBookingClick}
                    >
                      Book Service
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="bg-white/95 backdrop-blur-md border-t border-graphite-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <a
              href="tel:+996555123456"
              className="flex items-center space-x-2 text-graphite-700 hover:text-gold-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Call</span>
            </a>
            <Button
              variant="liquid"
              size="sm"
              onClick={handleBookingClick}
              className="px-6"
            >
              Book Now
            </Button>
            <a
              href="https://wa.me/996555123456"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-graphite-700 hover:text-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
