import { Link } from "wouter";
import { Instagram, Youtube, Music } from "lucide-react";
import { 
  SiSpotify, 
  SiX, 
  SiReddit, 
  SiTiktok,
  SiFacebook
} from "react-icons/si";
import { useQuery } from "@tanstack/react-query";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const { data: socialSettings = [] } = useQuery({
    queryKey: ["/api/social-media"],
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return Instagram;
      case "facebook": return SiFacebook;
      case "youtube": return Youtube;
      case "x": return SiX;
      case "tiktok": return SiTiktok;
      case "spotify": return SiSpotify;
      case "reddit": return SiReddit;
      default: return Instagram;
    }
  };

  return (
    <footer className="bg-background pt-12 pb-6 border-t border-border/40">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Products */}
          <div>
            <h3 className="font-montserrat text-base text-foreground mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <a href="/products" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  Serums
                </a>
              </li>
              <li>
                <a href="/products/category/Skincare" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  Moisturizers
                </a>
              </li>
              <li>
                <a href="/products" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  Face Oils
                </a>
              </li>
              <li>
                <a href="/products" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  Cleansers
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-montserrat text-base text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#about" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/ingredients" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  Ingredients
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-montserrat text-base text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="/account" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          {socialSettings.length > 0 && (
            <div>
              <h3 className="font-montserrat text-base text-foreground mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialSettings.map((setting: any) => {
                  const IconComponent = getPlatformIcon(setting.platform);
                  return (
                    <a 
                      key={setting.platform}
                      href={setting.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground transition-all duration-200 hover:scale-105"
                      aria-label={`Follow us on ${setting.platform.charAt(0).toUpperCase() + setting.platform.slice(1)}`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row md:justify-between items-center text-foreground/60 text-sm pt-8 border-t border-border/20">
          <p>&copy; {currentYear} Elixíe. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
