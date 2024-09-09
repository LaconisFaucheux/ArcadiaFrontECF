import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AnimalStat} from "../../../shared/interfaces/animalStats.interface";
import {HabitatStat} from "../../../shared/interfaces/habitatStats.interface";
import {DashboardService} from "../../../shared/services/dashboard.service";
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public apiUrl: string = '';
  public imageApiUrl: string = '';

  public animalStats$: Observable<AnimalStat[]>;
  public habitatStats$: Observable<HabitatStat[]>;

  constructor(
    private dashboardService: DashboardService,
    private apiService: ApiService,
  ) {
    this.apiUrl = apiService.getapiUrl();
    this.imageApiUrl = this.apiService.getImageApiUrl();
    this.animalStats$ = dashboardService.animalsStats$;
    this.habitatStats$ = dashboardService.habitatsStats$;
  }

  ngOnInit() {
    this.dashboardService.fetchAnimalsStats();
    this.dashboardService.fetchHabitatsStats();
  }

  // public deleteAnimalStat(id: string | null): void {
  //   if (confirm('Voulez vous vraiment supprimer cette statistique?')) {
  //     if (id)
  //       this.dashboardService.deleteAnimalStat(id);
  //   }
  // }

  // public deleteHabitatStat(id: string | null): void {
  //   if (confirm('Voulez vous vraiment supprimer cette statistique?')) {
  //     if (id)
  //       this.dashboardService.deleteHabitatsStats(id);
  //   }
  // }

}
