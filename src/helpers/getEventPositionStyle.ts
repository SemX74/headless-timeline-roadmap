import { CSSProperties } from "react";

export const getEventPositionStyle = ({
  percentages,
  rowIndex,
}: {
  rowIndex: number;
  percentages: { position: number; width: number };
}): CSSProperties => {
  return {
    top: `${(rowIndex + 1) * 50}px`,
    left: `${percentages.position}%`,
    width: `${percentages.width}%`,
    position: "absolute",
  };
};
