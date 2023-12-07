import {
  RecurringSchedule,
  ScheduleType,
  SpecificSchedule,
} from "src/components/models";

export interface PostSchedule {
  type: ScheduleType;
  payload?: RecurringSchedule | SpecificSchedule;
}

export interface Post {
  id: string;
  description: string;
  title: string;
  tags: string[];
  locations: string[];
  schedule: PostSchedule;
  // created_by: string;
  // created_at: Date;
}
