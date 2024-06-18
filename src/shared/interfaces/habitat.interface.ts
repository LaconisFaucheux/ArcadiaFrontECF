import {IHabitatImage} from "./habitatImage.interface";

export interface IHabitat {
  id: number;
  name: string;
  description: string;
  pics: IHabitatImage[];
}
