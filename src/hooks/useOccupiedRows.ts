import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getEventDateIndexes } from "src/helpers/getEventDateIndexes";
import { prepareRows } from "src/helpers/prepareRows";

export type TCommonCampaignEvent = {
  ends_at?: Date;
  starts_at?: Date;
  id: string;
};

export function useOccupiedRows<T extends TCommonCampaignEvent>({
  data,
  days,
}: {
  days: dayjs.Dayjs[];
  data: T[];
}) {
  const [occupiedRows, setOccupiedRows] = useState<string[][]>([]);

  useEffect(() => {
    const initialRows: string[][] = [];
    data.forEach((entry) => {
      if (!entry.ends_at || !entry.starts_at) {
        return null;
      }

      const dateIndexes = getEventDateIndexes({
        days,
        endsAt: entry.ends_at,
        startsAt: entry.starts_at,
      });

      if (!dateIndexes) return null;

      const { startIndex, endIndex } = dateIndexes;
      prepareRows(initialRows, startIndex, endIndex, days, entry.id);
    });
    setOccupiedRows(initialRows);
  }, [days, data]);

  return occupiedRows;
}
