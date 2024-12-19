import { ReactNode } from "react";

export function Chip({ children }: { children: ReactNode }) {
  return <span className="bg-primary text-white px-2 py-1 text-xs rounded-full">{children}</span>
}
