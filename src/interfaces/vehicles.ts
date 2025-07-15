export interface Vehicle {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  colour: string;
  id: string;
}

// we could add this in a types folder but i like the idea of grouping them as they share common details
export type Vehicles = Vehicle[];
