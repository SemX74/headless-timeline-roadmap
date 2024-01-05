import dayjs from "dayjs";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryRange = () => {
  const [searchParams] = useSearchParams();
  const queryFromDate = searchParams.get("from") as string;
  const queryToDate = searchParams.get("to") as string;

  const fromDate = useMemo(() => {
    if (queryFromDate) {
      return dayjs(queryFromDate).toDate();
    }
    return dayjs().subtract(23, "hours").toDate();
  }, [queryFromDate]);

  const toDate = useMemo(() => {
    if (queryToDate) {
      return dayjs(queryToDate).toDate();
    }
    return dayjs().endOf("hours").toDate();
  }, [queryToDate]);

  return { toDate, fromDate };
};
