import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IHabitat} from "../../../shared/interfaces/habitat.interface";
import {HabitatsDetailComponent} from "../habitats-detail/habitats-detail.component";
import {HabitatService} from "../../../shared/services/habitat.service";
import {Observable, Subscription} from "rxjs";
import {RouterLink} from "@angular/router";
import {AsyncPipe, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-habitats-list',
  standalone: true,
  imports: [
    HabitatsDetailComponent,
    RouterLink,
    AsyncPipe,
    TitleCasePipe
  ],
  templateUrl: './habitats-list.component.html',
  styleUrl: './habitats-list.component.css'
})
export class HabitatsListComponent {
  public habitats$: Observable<IHabitat[]>;
  //public habitats: IHabitat[] | null = null;
  //public subscription: Subscription = new Subscription();

  constructor(private habitatService: HabitatService) {
    this.habitats$ = this.habitatService.getHabitats();
  }

  ngOnInit() {
    // this.subscription.add(this.habitatService.habitats$.subscribe(habitats => {
    //   this.habitats = habitats;
    // }))
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
