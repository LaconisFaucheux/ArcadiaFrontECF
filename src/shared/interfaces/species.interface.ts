import {ISizeUnit} from "./sizeUnit.interface";
import {IWeightUnit} from "./weightUnit.interface";
import {IDiet} from "./diet.interface";
import {IHabitat} from "./habitat.interface";

export interface ISpecies{
  id: number | null;
  name: string;
  scientificName: string;
  description: string;
  maleMaxSize: number;
  femaleMaxSize: number | null;
  maleMaxWeight: number;
  femaleMaxWeight: number | null;
  idSizeUnit: number;
  idWeightUnit: number;
  lifespan: number;
  idDiet: number;
  sizeUnit: ISizeUnit;
  weightUnit: IWeightUnit;
  diet: IDiet;
  habitats: IHabitat[];
}
