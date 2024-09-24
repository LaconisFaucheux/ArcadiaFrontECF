import { Pipe, PipeTransform } from '@angular/core';
import {IFeeding} from "../interfaces/feeding.interface";

@Pipe({
  name: 'feedingFilter',
  standalone: true,
  pure: false
})
export class FeedingFilterPipe implements PipeTransform {

  transform(feedings: IFeeding[], species: number, name: string): IFeeding[] | null | undefined {
    if(!feedings) return null;
    if(!species || !name) return feedings;
    if(species == 0 && name.toLowerCase() == 'tous') return feedings;

    //Choose one species but no name
    if(species != 0 && name.toLowerCase() == 'tous') {
      return feedings.filter(f => f.relatedAnimal.speciesData.id == species);
    }

    //Choose a name but no species
    if(species == 0 && name.toLowerCase() != 'tous') {
      return feedings.filter(f => f.relatedAnimal.name.toLowerCase() == name.toLowerCase());
    }

    //Choose a name AND a species
    if(species != 0 && name.toLowerCase() != 'tous') {
      let list = feedings.filter(f => f.relatedAnimal.speciesData.id == species);
      return list.filter(l => l.relatedAnimal.name.toLowerCase() == name.toLowerCase());
    }

    //default
    return feedings;
  }

}
