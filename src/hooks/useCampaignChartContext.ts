import dayjs from "dayjs";
import { createContext, useContext } from "react";

export const CampaigningChartContext = createContext<{
  days: dayjs.Dayjs[];
}>(null!);

export const useCampaigningChartContext = () =>
  useContext(CampaigningChartContext);
