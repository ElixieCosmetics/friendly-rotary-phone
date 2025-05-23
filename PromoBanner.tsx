import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>🌟 Looking for a custom website like this?</span>
          <a
            href="mailto:info@sitebyte.org"
            className="text-white hover:text-emerald-100 underline decoration-2 underline-offset-2 transition-colors duration-200 flex items-center gap-1"
          >
            Contact us
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 text-white hover:text-emerald-200 transition-colors"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}