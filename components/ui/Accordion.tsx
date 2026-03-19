"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

function AccordionItemComponent({
  item,
  index,
}: {
  item: AccordionItem;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-dark-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-medium text-dark-900 group-hover:text-brand-600 transition-colors text-sm md:text-base">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-dark-400 group-hover:text-brand-600 transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-dark-500 text-sm md:text-base leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-dark-100", className)}>
      {items.map((item, index) => (
        <AccordionItemComponent key={index} item={item} index={index} />
      ))}
    </div>
  );
}
