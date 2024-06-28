import { Pipe, PipeTransform } from '@angular/core';
import { IAnimal } from '../interfaces/animal.interface';
import { IHabitat } from '../interfaces/habitat.interface';

@Pipe({
  name: 'animalFilter',
  standalone: true,
  pure: false
})
export class AnimalFilterPipe implements PipeTransform {

  transform(animals: IAnimal[], filters: number[]): IAnimal[] {
    let tmp = animals.filter(animal =>
      animal.speciesData.habitats.some(habitat =>
        filters.includes(habitat.id))
    )
    return tmp;
  }

}
