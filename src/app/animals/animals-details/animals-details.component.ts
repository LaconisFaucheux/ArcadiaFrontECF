import {Component, Input} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AnimalService} from "../../../shared/services/animal.service";
import {Observable, Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-animals-details',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './animals-details.component.html',
  styleUrl: './animals-details.component.css'
})
export class AnimalsDetailsComponent {
  //public animal: IAnimal | null = null;
  private id: string | null = null;
  public animal$: Observable<IAnimal>;
  //public subscription: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private animalService: AnimalService) {
    this.animal$ = this.animalService.getAnimal();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      console.log(this.id);
    })

    // this.subscription.add(this.animalService.animal$.subscribe(animal => {
    //   if (animal.id === parseInt(String(this.id))) {
    //     this.animal = animal;
    //   } else {
    //     this.animal = null;
    //   }
    // }))
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
