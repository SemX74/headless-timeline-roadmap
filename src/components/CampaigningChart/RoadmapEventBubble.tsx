import { Tooltip } from "@mantine/core";
import { FC } from "react";
import { IconType } from "react-icons";

interface RoadmapEventBubbleProps {
  tooltipLabel: string;
  icon: IconType;
  color: string;
  bubbleSize?: {
    width: number;
    height: number;
  };
  qty: number;
  onClick?: () => void;
}

const RoadmapEventBubble: FC<RoadmapEventBubbleProps> = ({
  color,
  icon: Icon,
  tooltipLabel,
  qty,
  onClick,
  bubbleSize = {
    height: 48,
    width: 48,
  },
}) => {
  return (
    <Tooltip
      classNames={{ tooltip: "capitalize" }}
      label={tooltipLabel}
      position="right"
    >
      <div
        onClick={onClick}
        style={{
          borderColor: color,
          color: color,
          width: bubbleSize.width + "px",
          height: bubbleSize.height + "px",
        }}
        className="w-12 h-12 cursor-pointer flex justify-center gap-1 items-center aspect-square relative bg-white border-2 rounded-full"
      >
        <Icon />
        {qty > 1 && <div className="text-xs">{qty}</div>}
      </div>
    </Tooltip>
  );
};

export default RoadmapEventBubble;
