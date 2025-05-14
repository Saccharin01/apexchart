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
 //여기가 문제임 selectedDate 값이 없을것.
  case "year":
    if (params.selectedDate.length === 4) { // ⚠ 확실히 연도만 왔을 때 처리
      finalDate = `${params.selectedDate}-01-01 00:00:00`;}
    break;
}

  if (finalDate) query.set("selectedDate", finalDate);

  if (["month", "day", "hour"].includes(params.type)) {
    if (params.direction) query.set("direction", params.direction);
    if (params.count !== undefined) query.set("count", params.count.toString());
  }

  return query.toString();
}
