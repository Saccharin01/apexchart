import { queryStringBuilderInterface } from "./queryStringBuilderInterface";

export function queryStringBuilder(
  params: queryStringBuilderInterface
): string {
  const query = new URLSearchParams();

  query.set("chipId", params.chipId);
  query.set("type", params.type);

  let finalDate = "";

  switch (params.type) {
    case "hour":
      if (params.selectedDate && params.selectedHour) {
        finalDate = `${params.selectedDate} ${params.selectedHour}:00:00`;
      }
      break;

    case "month":
      if (params.selectedDate) {
        finalDate = `${params.selectedDate}-01 00:00:00`;
      }
      break;

    case "day":
      if (params.selectedDate) {
        finalDate = `${params.selectedDate} 00:00:00`;
      }
      break;

    case "year":
      if (params.selectedDate.length === 4) {
        finalDate = `${params.selectedDate}-01-01 00:00:00`;
      }
      break;
  }

  if (finalDate) query.set("selectedDate", finalDate);

  // ✅ 모든 type에 대해 direction, count 처리
  if (params.direction) query.set("direction", params.direction);
  if (params.count !== undefined) query.set("count", params.count.toString());

  return query.toString();
}