export interface ISpeciesDTO {
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
  idHabitatsArray: number[]
}
