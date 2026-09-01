import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 max-w-sm bg-slate-900 border border-slate-800 text-white p-5 lg:p-6 shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-right-10 fade-in duration-500 md:rounded-lg rounded-none w-[calc(100%-2rem)] md:w-auto left-4 md:left-auto">
      <h3 className="text-lg font-serif mb-2 font-semibold">Cookie Consent</h3>
      <div className="text-[13px] text-slate-300 leading-relaxed mb-5">
        <p>
          We use cookies to improve your experience, analyze site traffic, and support our marketing efforts.
          By clicking "Accept All", you consent to our use of cookies.
          Read our <Link to="/privacy" className="text-white hover:text-accent underline transition-colors">Privacy Policy</Link> to learn more.
        </p>
      </div>
      <div className="flex items-center gap-3 w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={declineCookies}
          className="flex-1 border-slate-700 text-white bg-slate-800 hover:bg-slate-700 hover:text-white h-9"
        >
          Decline
        </Button>
        <Button
          size="sm"
          onClick={acceptCookies}
          className="flex-1 bg-accent hover:bg-accent/90 text-white h-9"
        >
          Accept All
        </Button>
      </div>
    </div>
  );
}
