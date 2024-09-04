import {Pipe, PipeTransform} from '@angular/core';
import {IAnimal} from "../interfaces/animal.interface";

@Pipe({
  name: 'animalsBySpecies',
  standalone: true,
  pure: false
})
export class AnimalsBySpeciesPipe implements PipeTransform {

  transform(animals: IAnimal[], filter: number | null): IAnimal[] {
    if (!filter) {
      return animals;
    } else {
      return animals.filter(animal =>
        animal.speciesData.id == filter);
    }
  }
}
