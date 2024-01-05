import { faker } from "@faker-js/faker";
import { TCommonRoadmapEvent } from "src/components/CampaigningChart/RoadmapEvents";

export type TRoadmapEvent = {
  title: string;
  subtitle: string;
  starts_at: Date;
} & TCommonRoadmapEvent;

export type TTimelineEvent = {
  ends_at: Date;
} & TRoadmapEvent;

const randomDateWithin15Days = (baseDate: Date = new Date()): Date => {
  const randomDays = faker.number.int({ min: 0, max: 40 });
  const newDate = new Date(baseDate);
  newDate.setDate(newDate.getDate() + randomDays);
  return newDate;
};

// Generate arrays
export const generateEvents = (
  includeEndsAt: boolean = false,
  length: number = 15
): TRoadmapEvent[] | TTimelineEvent[] =>
  Array.from({ length }, () => {
    const startsAt = randomDateWithin15Days();
    const endsAt = includeEndsAt ? randomDateWithin15Days(startsAt) : undefined;

    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(2),
      subtitle: faker.lorem.sentence(2),
      description: includeEndsAt ? undefined : faker.lorem.sentence(2),
      starts_at: startsAt,
      ends_at: endsAt,
    };
  });
