import { ExternalLink } from "lucide-react";

export default function FooterCredit() {
  return (
    <div className="bg-gray-50 border-t border-gray-200 py-3">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-600">
          Looking for a custom site like this?{" "}
          <a
            href="mailto:info@sitebyte.org"
            className="text-emerald-600 hover:text-emerald-700 underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium inline-flex items-center gap-1"
          >
            Contact us
            <ExternalLink className="h-3 w-3" />
          </a>
          {" "}for professional web development services.
        </p>
      </div>
    </div>
  );
}