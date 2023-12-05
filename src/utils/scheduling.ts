import { v1 as uuid } from "uuid";

export const getNewGroupTimes = () => {
  const d = new Date();
  const closestHour = d.getHours() + Math.round(d.getMinutes() / 60);

  if (closestHour === 24) {
    return { id: uuid(), start: "00:00", end: "01:00" };
  }

  return {
    id: uuid(),
    start: `${closestHour.toString().padStart(2, "0")}:00`,
    end: `${(closestHour + 1).toString().padStart(2, "0")}:00`,
  };
};
