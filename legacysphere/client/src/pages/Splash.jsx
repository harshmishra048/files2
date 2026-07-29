import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Splash() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Fade in
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Start leaving
    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 2000);

    // Navigate after animation
    const navTimer = setTimeout(() => {
      navigate("/landing");
    }, 2500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(leaveTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-stone-50 overflow-hidden">
      <div className="relative">
        {/* Subtle background circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-stone-200/50 rounded-full"></div>

        {/* Content */}
        <div
          className={`relative text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${isLeaving ? "opacity-0 scale-95" : "scale-100"}`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-stone-900 rounded-2xl">
              <GraduationCap size={36} className="text-stone-50" />
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-4xl font-semibold text-stone-900 tracking-tight">
            LegacySphere
          </h1>

          {/* Tagline */}
          <p className="mt-3 text-sm text-stone-500 font-light tracking-wide">
            Your alumni network
          </p>

          {/* Loading indicator */}
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-0.5 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-stone-400 rounded-full animate-load"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes load {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
        .animate-load {
          animation: load 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
