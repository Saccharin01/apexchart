import { queryStringBuilderInterface } from "./queryStringBuilderInterface";

export function queryStringBuilder (params: queryStringBuilderInterface): string {
  const query = new URLSearchParams();

  query.set("chipId", params.chipId);
  query.set("type", params.type);

  let finalDate = params.baseDate;

  if (params.type === "hour" && params.baseDate && params.selectedHour) {
    finalDate += ` ${params.selectedHour}:00:00`;
  }

  if (finalDate) query.set("baseDate", finalDate);

  if (["month", "day", "hour"].includes(params.type)) {
    if (params.direction) query.set("direction", params.direction);
    if (params.count !== undefined) query.set("count", params.count.toString());
  }

  return query.toString();
}