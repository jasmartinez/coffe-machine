export enum OrderEntryTypeEnum {
  CoffeeSize = 'CS',
  CoffeeType = 'CT',
  CoffeeTopping = 'T',
}
export interface OrderEntry {
  type: OrderEntryTypeEnum;
  units: number;
  price: number;
  name: string;
  id:string;
  url:string;
  selected:boolean;
}


export interface OrderSummary {
  order:OrderEntry[],
  total:number,
  refund:number
}

