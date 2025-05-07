import {Type} from "@/shared/static.types"

export default interface unitSelectorInterface {
  type: Type;
  setType: (type: "year" | "month" | "day" | "hour") => void;
  resetDate: () => void;
}