import { SensorResponseDTO, AggregatedDataDTO } from "./interface/Data.interface";


export type Direction = "before" | "after";
export type Type = "year" | "month" | "week" | "day" | "hour";
export type ChartData = SensorResponseDTO | AggregatedDataDTO[];