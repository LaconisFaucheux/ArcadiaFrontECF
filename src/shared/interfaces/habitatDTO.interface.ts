import {IHabitatImage} from "./habitatImage.interface";

export interface IHabitatDTO {
  id: number;
  name: string;
  description: string;
  images: File[];
  deletedImages: number[];
}
