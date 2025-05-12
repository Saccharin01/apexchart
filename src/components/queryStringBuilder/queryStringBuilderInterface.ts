import { Direction, Type } from "@/shared/static.types";

export interface queryStringBuilderInterface {
  chipId: string;
  type: Type;
  selectedDate: string;
  selectedHour?: string;
  direction?: Direction
  count?: number;
}