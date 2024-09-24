import {IWeightUnit} from "./weightUnit.interface";
import {IAnimal} from "./animal.interface";

export interface IFeeding {
  id: number | null;
  employeeEmail: string;
  idAnimal : number;
  food: string;
  date: string;
  weight: number;
  idWeightUnit: number;
  weightUnit: IWeightUnit;
  relatedAnimal: IAnimal;
}
