import {Type} from "@/shared/static.types"

export default interface unitSelectorInterface {
  type: Type;
  setType: (type : Type) => void;
  resetDate: () => void;
}