import dayjs from "dayjs";
import { FC } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

interface MonthPanelProps {
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  currentMonth: dayjs.Dayjs;
}

const MonthPanel: FC<MonthPanelProps> = ({
  onNextMonth,
  onPreviousMonth,
  currentMonth,
}) => {
  return (
    <div className="mr-5 flex gap-2 items-center text-white">
      <button className="bg-red-yellow shadow-md rounded p-2" onClick={onPreviousMonth}>
        <FaChevronLeft />
      </button>
      <span className="w-72 text-xl whitespace-nowrap text-center">
        {dayjs(currentMonth.toDate()).format("MMMM YY")}
      </span>
      <button className="bg-red-yellow shadow-md rounded p-2" onClick={onNextMonth}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default MonthPanel;
