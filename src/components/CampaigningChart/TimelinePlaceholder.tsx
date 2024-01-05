import { FC, ReactNode } from "react";

interface TimelinePlaceholderProps {
  children: ReactNode;
}

export const TimelinePlaceholder: FC<TimelinePlaceholderProps> = ({
  children,
}) => {
  return (
    <div className="absolute flex justify-start items-center top-0 left-0 shadow w-full h-full bg-black/10 border  px-7">
      <div className="sticky left-1/2 -translate-x-1/2 z-20">{children}</div>,
    </div>
  );
};
