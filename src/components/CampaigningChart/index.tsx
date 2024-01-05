import { FC, PropsWithChildren, ReactNode, useMemo } from "react";
import dayjs from "dayjs";
import { TimelineDays } from "./TimelineDays";
import { RoadmapWrapper } from "./RoadmapWrapper";
import { TimelineEvent } from "./TimelineEvent";
import MonthPanel from "./MonthPanel";
import PanelWrapper from "./PanelWrapper";
import { CampaigningChartContext } from "src/hooks/useCampaignChartContext";
import { isDayInRange } from "src/helpers/isDayInRange";
import { useScrollMonth } from "src/hooks/useScrollMonth";
import { getDaysRange } from "src/helpers/getDaysRange";
import { RoadmapEvent } from "./RoadmapEvent";
import RoadmapEvents from "./RoadmapEvents";

interface CampaigningChartProps extends PropsWithChildren {
  header?: ReactNode;
  startDate: string;
  endDate: string;
  onNextSeason: () => void;
  onPrevSeason: () => void;
  onCurrentSeason: () => void;
}

const CampaigningChartComponent: FC<CampaigningChartProps> = ({
  children,
  endDate,
  startDate,
  header,
  ...seasonHandlers
}) => {
  const days = useMemo(
    () =>
      getDaysRange(
        dayjs(startDate, "YYYY-MM-DD"),
        dayjs(endDate, "YYYY-MM-DD")
      ),
    [startDate, endDate]
  );

  const {
    currentMonth,
    nextMonth,
    previousMonth,
    startMonth,
    endMonth,
    scroll: { scrollIntoView, containerRef },
  } = useScrollMonth({
    days,
  });

  const handlePrevMonth = () => {
    if (currentMonth.month() === dayjs(startDate, "YYYY-MM-DD").month()) {
      seasonHandlers.onPrevSeason();
      endMonth();
    } else {
      previousMonth();
    }
  };

  const handleNextMonth = () => {
    if (currentMonth.month() === dayjs(endDate, "YYYY-MM-DD").month()) {
      seasonHandlers.onNextSeason();
      startMonth();
    } else {
      nextMonth();
    }
  };

  const handleScrollIntoView = () => {
    if (
      !isDayInRange(
        dayjs(),
        dayjs(startDate, "YYYY-MM-DD"),
        dayjs(endDate, "YYYY-MM-DD")
      )
    ) {
      seasonHandlers.onCurrentSeason();
    }
    setTimeout(scrollIntoView, 0);
  };

  return (
    <CampaigningChartContext.Provider value={{ days }}>
      <div className="flex bg-dark rounded relative flex-col">
        <PanelWrapper>
          <MonthPanel
            currentMonth={currentMonth}
            onNextMonth={handleNextMonth}
            onPreviousMonth={handlePrevMonth}
          />

          <div className="ml-auto">
            {!currentMonth.isSame(dayjs(), "month") && (
              <button
                className="bg-red-yellow text-white rounded shadow-md px-4 py-2"
                onClick={handleScrollIntoView}
              >
                Back to current date
              </button>
            )}
          </div>

          {header}
        </PanelWrapper>
        <div ref={containerRef} className="overflow-x-auto  w-full">
          <div className="flex flex-col w-fit h-fit ">{children}</div>
        </div>
      </div>
    </CampaigningChartContext.Provider>
  );
};

export const CampaigningChart = Object.assign(CampaigningChartComponent, {
  Panel: {
    Wrapper: PanelWrapper,
  },
  Roadmap: {
    Wrapper: RoadmapWrapper,
    Events: RoadmapEvents,
    Event: RoadmapEvent,
  },
  Timeline: {
    Days: TimelineDays,
    Event: TimelineEvent,
  },
});

export default CampaigningChart;
