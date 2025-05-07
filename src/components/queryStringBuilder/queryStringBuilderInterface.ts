import { Direction, Type } from "@/shared/static.types";

export interface queryStringBuilderInterface {
  chipId: string;
  type: Type;
  baseDate: string;
  selectedHour?: string;
  direction?: Direction
  count?: number;
}