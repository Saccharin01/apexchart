import { queryStringBuilderInterface } from "./queryStringBuilderInterface";

export function queryStringBuilder (params: queryStringBuilderInterface): string {
  const query = new URLSearchParams();

  query.set("chipId", params.chipId);
  query.set("type", params.type);

  let finalDate = "";

  if (params.type === "hour" && params.selectedDate && params.selectedHour) {
    finalDate = `${params.selectedDate} ${params.selectedHour}:00:00`;
  } else if (params.selectedDate) {
    finalDate = `${params.selectedDate} 00:00:00`;
  }

  if (finalDate) query.set("selectedDate", finalDate);

  if (["month", "day", "hour"].includes(params.type)) {
    if (params.direction) query.set("direction", params.direction);
    if (params.count !== undefined) query.set("count", params.count.toString());
  }

  return query.toString();
}