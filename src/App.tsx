import dayjs from "dayjs";
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import CampaigningChart from "./components/CampaigningChart";
import NoCampaignsPlaceholder from "./components/CampaigningChart/NoCampaignsPlaceholder";
import RoadmapEventBubble from "./components/CampaigningChart/RoadmapEventBubble";
import TimelineEventExample from "./components/CampaigningChart/TimelineEventExample";
import { colors } from "./helpers/colors";
import { generateEvents, TRoadmapEvent, TTimelineEvent } from "./helpers/faker";

const stateSeason = {
  startsAt: dayjs().startOf("year").format("YYYY-MM-DD"),
  endsAt: dayjs().endOf("year").format("YYYY-MM-DD"),
  onNextSeason: () => 1,
  onPrevSeason: () => 1,
  onCurrentSeason: () => 1,
};

function App() {
  const { startsAt, endsAt, ...seasonHandlers } = stateSeason;

  const array1: TRoadmapEvent[] = generateEvents();
  const array2: TRoadmapEvent[] = generateEvents();
  const array3: TTimelineEvent[] = generateEvents(true, 6);

  return (
    <div className="bg-neutral-800 h-screen pt-6">
      <div className="w-11/12 mx-auto p-5 bg-white rounded-xl shadow-xl">
        <CampaigningChart
          {...seasonHandlers}
          startDate={startsAt}
          endDate={endsAt}
        >
          <CampaigningChart.Roadmap.Wrapper>
            <CampaigningChart.Roadmap.Events data={array1} dateKey="starts_at">
              {(props) => (
                <CampaigningChart.Roadmap.Event
                  collapsedOffsetX={1.5}
                  minFreeDays={4}
                  collapsed={({ events }) => (
                    <RoadmapEventBubble
                      tooltipLabel={"Campaigns"}
                      icon={FaRegEnvelope}
                      color={colors["dark-yellow"]}
                      qty={events.length}
                    />
                  )}
                  extendedOffsetX={-0.6}
                  extended={(event) => (
                    <div
                      style={{ borderColor: colors["dark-yellow"] }}
                      className="flex bg-white rounded-r border absolute px-4 py-1 -z-10 whitespace-nowrap justify-start items-start flex-col"
                      key={event.id}
                    >
                      <p className="capitalize text-xs">{event.subtitle}</p>
                      <p className="capitalize text-xs font-bold">
                        {dayjs(event.starts_at).format("MMMM, DD")}
                      </p>
                    </div>
                  )}
                  color={colors["dark-yellow"]}
                  height={200}
                  {...props}
                />
              )}
            </CampaigningChart.Roadmap.Events>
            <CampaigningChart.Roadmap.Events data={array2} dateKey="starts_at">
              {(props) => (
                <CampaigningChart.Roadmap.Event
                  {...props}
                  height={100}
                  color={colors["red-yellow"]}
                  minFreeDays={3}
                  extendedOffsetX={-0.6}
                  extended={(event) => (
                    <div
                      style={{ borderColor: colors["red-yellow"] }}
                      className="flex bg-white rounded-r border absolute px-4 py-1 -z-10 whitespace-nowrap justify-start items-start flex-col"
                      key={event.id}
                    >
                      <h3 className="capitalize text-xs">{event.title}</h3>
                      <p className="capitalize text-xs font-light">
                        {event.subtitle}
                      </p>
                      <p className="capitalize text-xs font-bold">
                        {dayjs(event.starts_at).format("MMMM, DD")}
                      </p>
                    </div>
                  )}
                  collapsedOffsetX={1.3}
                  collapsed={({ events }) => (
                    <RoadmapEventBubble
                      tooltipLabel={"Events"}
                      icon={FaRegCalendarAlt}
                      bubbleSize={{ height: 44, width: 44 }}
                      color={colors["red-yellow"]}
                      qty={events.length}
                    />
                  )}
                />
              )}
            </CampaigningChart.Roadmap.Events>
          </CampaigningChart.Roadmap.Wrapper>

          <CampaigningChart.Timeline.Days
            dayCellProps={{
              showPlusIconOnHover: true,
            }}
            onDayRangeChange={(e) => console.log(e)}
            data={array3}
            placeholder={{
              show: true,
              timelinesAmount: 6,
              element: <NoCampaignsPlaceholder />,
            }}
          >
            {({ event: code, style, index }) => (
              <CampaigningChart.Timeline.Event key={index} style={style}>
                <TimelineEventExample code={code} />
              </CampaigningChart.Timeline.Event>
            )}
          </CampaigningChart.Timeline.Days>
        </CampaigningChart>
      </div>
    </div>
  );
}

export default App;
