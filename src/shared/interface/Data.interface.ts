export interface ProductDTO {
  name : string,
  price : number,
  stock : number,
  create_at : Date,
  update_at : Date
}

export interface SensorUnitIds {
  chipIds: string[];
}


export interface SensorDataDTO {
  sensedData: number;
  sensedTime: string; // ISO 형식의 문자열 (e.g., "2025-04-29T23:12:41")
}

export interface SensorResponseDTO {
  chipId: string;
  name: string;
  location: string;
  data: SensorDataDTO[];
}