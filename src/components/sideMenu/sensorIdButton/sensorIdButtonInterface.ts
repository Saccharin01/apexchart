export default interface SensorIdButtonInterface {
  chipId: string;
  selected: boolean;
  onSelect: (chipId: string) => void;
}