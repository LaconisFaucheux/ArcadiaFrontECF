import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IHabitat} from "../../../shared/interfaces/habitat.interface";
import {HabitatsDetailComponent} from "../habitats-detail/habitats-detail.component";
import {HabitatService} from "../../../shared/services/habitat.service";
import {Observable, Subscription} from "rxjs";
import {RouterLink} from "@angular/router";
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../loading-spinner/loading-spinner.component";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-habitats-list',
  standalone: true,
  imports: [
    HabitatsDetailComponent,
    RouterLink,
    AsyncPipe,
    TitleCasePipe,
    LoadingSpinnerComponent
  ],
  templateUrl: './habitats-list.component.html',
  styleUrl: './habitats-list.component.css'
})
export class HabitatsListComponent {
  public apiUrl: string = '';
  public imageApiUrl: string = '';
  public habitats$: Observable<IHabitat[]>;

  constructor(private habitatService: HabitatService, private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
    this.imageApiUrl = this.apiService.getImageApiUrl();
    this.habitats$ = this.habitatService.getHabitats();
  }

  ngOnInit() {
    this.habitatService.fetchAllData()
  }
}
