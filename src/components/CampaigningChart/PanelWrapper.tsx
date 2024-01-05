import classNames from "classnames";
import { ComponentProps, FC, ReactNode } from "react";

interface PanelWrapperProps extends ComponentProps<"section"> {
  children: ReactNode;
}

const PanelWrapper: FC<PanelWrapperProps> = ({ children, ...rest }) => {
  return (
    <section
      {...rest}
      className={classNames(
        "relative mb-3 gap-3 p-4 px-8 h-20 flex w-full items-center justify-start",
        rest.className
      )}
    >
      {children}
    </section>
  );
};

export default PanelWrapper;
