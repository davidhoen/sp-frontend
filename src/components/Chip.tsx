import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Chip({ children, className }: { children: ReactNode, className?: string }) {
  return <span className={cn("bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-md text-nowrap", className)}>{children}</span>
}
