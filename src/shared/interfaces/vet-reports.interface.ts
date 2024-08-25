import {IAnimal} from "./animal.interface";
import {IWeightUnit} from "./weightUnit.interface";

export interface IVetReport {
  id: number;
  food:string;
  foodWeight: number;
  visitDate: Date;
  observations: string,
  animal: IAnimal;
  foodWeightUnit: IWeightUnit;
}
