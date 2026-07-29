import { User } from "lucide-react";

export default function Avatar({ src, alt, size = "md", className = "" }) {
  const sizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
  };

  const iconSizes = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    "2xl": 40,
  };

  return (
    <div
      className={`${sizes[size]} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <User
          size={iconSizes[size]}
          className="text-gray-400 dark:text-gray-500"
        />
      )}
    </div>
  );
}
