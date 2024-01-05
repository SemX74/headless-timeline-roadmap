import { createContext, useContext } from "react";

export const TimelineContext = createContext<{
  occupiedRows: string[][];
}>(null!);

export const useTimelineContext = () => useContext(TimelineContext);
