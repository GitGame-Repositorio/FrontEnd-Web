import { ReactNode } from "react";

export const MainContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-primary-200 p-8 rounded-xl space-y-8">{children}</div>
  );
};
