export interface ProductDTO {
  name : string,
  price : number,
  stock : number,
  create_at : Date,
  update_at : Date
}

export default interface SensorUnitIds {
  chipIds: string[];
}
