import { Dayjs } from "dayjs";

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface SelectedDays {
  monday?: Array<{ start: Date; end: Date }>;
  tuesday?: Array<{ start: Date; end: Date }>;
  wednesday?: Array<{ start: Date; end: Date }>;
  thursday?: Array<{ start: Date; end: Date }>;
  friday?: Array<{ start: Date; end: Date }>;
  saturday?: Array<{ start: Date; end: Date }>;
  sunday?: Array<{ start: Date; end: Date }>;
}

export interface ScheduleTime {
  id: string;
  start: string;
  end: string;
  error?: boolean;
}

export interface RecurringScheduleTimeGroup {
  day: Day;
  times: ScheduleTime[];
}

export type RecurringSchedule = Record<Day, ScheduleTime[] | null>;

export interface SpecificSchedule {
  day: Dayjs;
  times: ScheduleTime[];
}
