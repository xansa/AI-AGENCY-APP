"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  if (hover) {
    return (
      <motion.div
        className={cn(
          "bg-white border border-dark-100 rounded-2xl",
          paddingMap[padding],
          className
        )}
        whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white border border-dark-100 rounded-2xl",
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
