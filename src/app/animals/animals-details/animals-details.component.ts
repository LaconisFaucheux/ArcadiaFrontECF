import {Component, Input} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AnimalService} from "../../../shared/services/animal.service";
import {isEmpty, Observable, Subscription} from "rxjs";
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-animals-details',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    LoadingSpinnerComponent
  ],
  templateUrl: './animals-details.component.html',
  styleUrl: './animals-details.component.css'
})
export class AnimalsDetailsComponent {
  private id: string | null = null;
  public animal$: Observable<IAnimal> = new Observable<IAnimal>();

  constructor(private activatedRoute: ActivatedRoute,
              private animalService: AnimalService) {
    this.animal$ = this.animalService.getAnimal();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    })
    //this.animalService.setAnimal(parseInt(String(this.id)));
    this.animalService.fetchUniqueAnimal(parseInt(String(this.id)));
  }
}
