import {Component, Input} from '@angular/core';
import {IHabitat} from "../../../shared/interfaces/habitat.interface";
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {AnimalService} from "../../../shared/services/animal.service";
import {HabitatService} from "../../../shared/services/habitat.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {AsyncPipe, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-habitats-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './habitats-detail.component.html',
  styleUrl: './habitats-detail.component.css'
})
export class HabitatsDetailComponent {

  public habitat$: Observable<IHabitat>;
  public inhabitants$: Observable<IAnimal[]>;
  public id: string | null = null;

  constructor(private habitatService: HabitatService,
              protected animalService: AnimalService,
              private activatedRoute: ActivatedRoute) {
    this.habitat$ = this.habitatService.getHabitat();
    this.inhabitants$ = this.animalService.getInhabitants();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    })

    if(this.id){
      // this.habitatService.selectHabitat(parseInt(this.id));
      // this.animalService.setInhabitants(parseInt(this.id));

      this.habitatService.fetchUniqueHabitat(parseInt(this.id));
      this.animalService.fetchInhabitantsByHabitatId(parseInt(this.id));
    }
  }
}
