import classNames from "classnames";
import dayjs from "dayjs";
import { FC } from "react";
import { getRefKeyForMonth } from "src/hooks/useScrollMonth";
import { FaPlus } from "react-icons/fa6";

interface TimelineDayProps {
  day: dayjs.Dayjs;
  active?: boolean;
  dayCellProps?: {
    showPlusIconOnHover?: boolean;
    onClick?: () => void;
  };
  onMouseDown: (e: any) => void;
  onMouseOver: (e: any) => void;
  onMouseUp: () => void;
}

const TimelineDay: FC<TimelineDayProps> = ({
  day,
  active = false,
  dayCellProps = {},
  ...handlers
}) => {
  const getIsCurrentDay = (day: dayjs.Dayjs) =>
    dayjs().date() === day.date() &&
    dayjs().month() === day.month() &&
    dayjs().year() === day.year();

  return (
    <div
      {...handlers}
      id={getRefKeyForMonth(day)}
      className={classNames(
        "flex flex-col select-none group cursor-pointer items-center border-r border-black h-full",
        "w-8",
        {
          "bg-red-yellow ": getIsCurrentDay(day),
          "border-l-red-800 border-l": day.date() === 1,
          "bg-light-gray": ![0, 6].includes(day.day()),
          "bg-dark-gray": [0, 6].includes(day.day()),
          "bg-primary-200 hover:bg-primary-300  border-x-primary-300 border-x":
            active,
        },
        "hover:bg-semi-dark duration-100"
      )}
    >
      <div
        onClick={dayCellProps?.onClick}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
        className={classNames(
          "flex justify-center mt-2 duration-100 border-2 border-dark-yellow bg-light-yellow rounded-full shadow  items-center w-full text-center group/cell grou-hover:bg-gray-200",
          "h-8",
          {
            "border-red-yellow text-black":
              getIsCurrentDay(day),
            " text-gray-600": !getIsCurrentDay(day),
          }
        )}
      >
        <span
          className={classNames({
            "inline group-hover/cell:hidden": dayCellProps.showPlusIconOnHover,
          })}
        >
          {dayjs(day.toDate()).format("DD")}
        </span>
        <div
          className={classNames(
            "hidden group-hover/cell:flex rounded-full justify-center items-center w-full h-full bg-dark-yellow text-white",
            {
              hidden: !dayCellProps.showPlusIconOnHover,
            }
          )}
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );
};
export default TimelineDay;
