import { ChartData } from "@/shared/static.types";

export default interface ChartDataContextType {
  sensorData: ChartData | null;
  setSensorData: (data: ChartData) => void;
}