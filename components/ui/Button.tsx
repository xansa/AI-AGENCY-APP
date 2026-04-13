"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { forwardRef } from "react";

// Omit the event handlers that framer-motion redefines with incompatible types
type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
>;

interface ButtonProps extends NativeButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "ink";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

// Arka V2 editorial button variants
const buttonVariants = {
  // Arka blue on cream, primary CTA
  primary:
    "bg-arka text-white hover:bg-arka-hover ring-1 ring-arka/30",
  // Dark ink pill, secondary CTA with strong contrast on light bg
  ink:
    "bg-ink text-cream hover:bg-ink-light ring-1 ring-ink/20",
  // Neutral outline on light
  secondary:
    "bg-transparent text-slate-ink ring-1 ring-slate-950/15 hover:bg-slate-950/5 hover:ring-slate-950/30",
  // Legacy alias, same as secondary
  outline:
    "bg-transparent text-slate-ink ring-1 ring-slate-950/15 hover:bg-slate-950/5 hover:ring-slate-950/30",
  // Text only
  ghost:
    "bg-transparent text-slate-ink/80 hover:text-slate-ink hover:bg-slate-950/5",
};

const buttonSizes = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-6 py-2.5 text-sm rounded-full",
  lg: "px-8 py-3.5 text-[15px] rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external,
      loading,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 font-medium cursor-pointer select-none whitespace-nowrap",
      "transition-all duration-200 ease-out",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-arka focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
      buttonVariants[variant],
      buttonSizes[size],
      (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
      className
    );

    const hoverMotion = { y: -1 };
    const tapMotion = { y: 0, scale: 0.98 };

    if (href) {
      if (external) {
        return (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            whileHover={hoverMotion}
            whileTap={tapMotion}
          >
            {children}
          </motion.a>
        );
      }
      return (
        <motion.span
          className="inline-flex"
          whileHover={hoverMotion}
          whileTap={tapMotion}
        >
          <Link href={href} className={classes}>
            {children}
          </Link>
        </motion.span>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? hoverMotion : {}}
        whileTap={!disabled && !loading ? tapMotion : {}}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
