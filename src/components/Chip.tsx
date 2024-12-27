import { ReactNode } from "react";

export function Chip({ children }: { children: ReactNode }) {
  return <span className="bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-md">{children}</span>
}
