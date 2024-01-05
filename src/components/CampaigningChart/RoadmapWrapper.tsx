import { FC, ReactNode } from "react";

interface RoadmapWrapperProps {
  children: ReactNode;
}

export const RoadmapWrapper: FC<RoadmapWrapperProps> = ({ children }) => {
  return <div className="relative w-full h-[300px]">{children}</div>;
};
