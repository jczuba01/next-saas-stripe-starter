import { ReactNode } from "react";

export function ContentContainer({ children }: { children?: ReactNode }) {
  return <div className="flex flex-col gap-5">{children}</div>;
}
