import { TSeason } from "@/types/TSeason";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

export const useStateSeason = (defaultSeason?: TSeason) => {
  const [season, setSeason] = useState<{
    startsAt: string;
    endsAt: string;
  } | null>(null);

  useEffect(() => {
    if (!season) {
      setSeason({
        startsAt: dayjs(defaultSeason?.starts_at).format("YYYY-MM-DD"),
        endsAt: dayjs(defaultSeason?.ends_at).format("YYYY-MM-DD"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSeason]);

  const onCurrentSeason = () => {
    setSeason({
      startsAt: dayjs(defaultSeason?.starts_at).format("YYYY-MM-DD"),
      endsAt: dayjs(defaultSeason?.ends_at).format("YYYY-MM-DD"),
    });
  };

  const onPrevSeason = () => {
    setSeason((prevState) => ({
      startsAt: dayjs(prevState?.startsAt, "YYYY-MM-DD")
        .subtract(1, "year")
        .format("YYYY-MM-DD"),
      endsAt: dayjs(prevState?.endsAt, "YYYY-MM-DD")
        .subtract(1, "year")
        .format("YYYY-MM-DD"),
    }));
  };

  const onNextSeason = () => {
    setSeason((prevState) => ({
      startsAt: dayjs(prevState?.startsAt, "YYYY-MM-DD")
        .add(1, "year")
        .format("YYYY-MM-DD"),
      endsAt: dayjs(prevState?.endsAt, "YYYY-MM-DD")
        .add(1, "year")
        .format("YYYY-MM-DD"),
    }));
  };

  return [season, { onCurrentSeason, onPrevSeason, onNextSeason }] as const;
};
