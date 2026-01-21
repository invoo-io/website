"use client";

import * as React from "react";
import {
  Accordion as AccordionRoot,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface BlogAccordionProps {
  title: string;
  children: React.ReactNode;
  value?: string;
  defaultOpen?: boolean;
}

export function Accordion({
  title,
  children,
  value = "item",
  defaultOpen = false,
}: BlogAccordionProps) {
  return (
    <AccordionRoot
      type="single"
      collapsible
      defaultValue={defaultOpen ? value : undefined}
      className="not-prose my-8 w-full"
    >
      <AccordionItem
        value={value}
        className={cn(
          "bg-background-secondary rounded-[16px] border border-border-primary",
          "hover:bg-background-tertiary data-[state=open]:bg-background-tertiary",
          "transition-colors px-6"
        )}
      >
        <AccordionTrigger className="text-left hover:no-underline py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-main focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary rounded-lg">
          <span className="text-headline text-label-primary pr-4">
            {title}
          </span>
        </AccordionTrigger>
        <AccordionContent className={cn(
          "pb-4 pt-0",
          "text-body text-label-secondary",
          "[&_p]:mb-3 [&_p:last-child]:mb-0",
          "[&_ul]:my-3 [&_ul]:ml-5 [&_ul]:space-y-2.5 [&_ul]:list-disc",
          "[&_li]:text-label-secondary [&_li]:pl-1",
          "[&_strong]:text-label-primary [&_strong]:text-body-emphasized",
          "[&_em]:text-label-primary [&_em]:italic",
          "[&_a]:text-accent-blue-main [&_a]:hover:underline"
        )}>
          {children}
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
}

interface AccordionGroupProps {
  children: React.ReactNode;
  defaultValue?: string;
}

export function AccordionGroup({ children, defaultValue }: AccordionGroupProps) {
  const validChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child)
  );

  return (
    <AccordionRoot
      type="single"
      collapsible
      defaultValue={defaultValue}
      className="not-prose my-8 w-full space-y-4"
    >
      {validChildren}
    </AccordionRoot>
  );
}

interface AccordionGroupItemProps {
  title: string;
  children: React.ReactNode;
  value: string;
}

export function AccordionGroupItem({
  title,
  children,
  value,
}: AccordionGroupItemProps) {
  return (
    <AccordionItem
      value={value}
      className={cn(
        "bg-background-secondary rounded-[16px] border border-border-primary",
        "hover:bg-background-tertiary data-[state=open]:bg-background-tertiary",
        "transition-colors px-6"
      )}
    >
      <AccordionTrigger className="text-left hover:no-underline py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-main focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary rounded-lg">
        <span className="text-headline text-label-primary pr-4">
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent className={cn(
        "pb-4 pt-0",
        "text-body text-label-secondary",
        "[&_p]:mb-3 [&_p:last-child]:mb-0",
        "[&_ul]:my-3 [&_ul]:ml-5 [&_ul]:space-y-2.5 [&_ul]:list-disc",
        "[&_li]:text-label-secondary [&_li]:pl-1",
        "[&_strong]:text-label-primary [&_strong]:text-body-emphasized",
        "[&_em]:text-label-primary [&_em]:italic",
        "[&_a]:text-accent-blue-main [&_a]:hover:underline"
      )}>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
