import {IAnimalImage} from "./animalImage.interface";
import {ISpecies} from "./species.interface";
import {IHealth} from "./health.interface";

export interface IAnimal {
  id: number;
  name: string;
  isMale: boolean;
  idSpecies: number;
  idHealth: number;
  pics: IAnimalImage[];
  speciesData: ISpecies;
  healthData: IHealth;
}
