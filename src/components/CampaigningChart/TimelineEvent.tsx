import classNames from "classnames";
import { ComponentProps, FC, ReactNode } from "react";

interface TimelineEventProps extends ComponentProps<"div"> {
  children?: ReactNode;
}
export const TimelineEvent: FC<TimelineEventProps> = ({
  children,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        "absolute whitespace-nowrap py-2 border-red-yellow border text-center text-xs rounded shadow-md z-10",
        rest.className ?? "bg-dark-yellow"
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
