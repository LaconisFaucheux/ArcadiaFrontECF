import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {VetReportsService} from "../../../../shared/services/vet-reports.service";
import {AnimalService} from "../../../../shared/services/animal.service";
import {IAnimal} from "../../../../shared/interfaces/animal.interface";
import {IVetReport} from "../../../../shared/interfaces/vet-reports.interface";
import {AsyncPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LoadingSpinnerComponent} from "../../../loading-spinner/loading-spinner.component";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-admin-vet-visits-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    LoadingSpinnerComponent
  ],
  templateUrl: './admin-vet-visits-list.component.html',
  styleUrl: './admin-vet-visits-list.component.css'
})
export class AdminVetVisitsListComponent {

  public reports$: Observable<IVetReport[]> = new Observable<IVetReport[]>();
  public report$: Observable<IVetReport | null> = new Observable<IVetReport | null>();
  public animals$: Observable<IAnimal[]> = new Observable<IAnimal[]>();
  private animals: IAnimal[] = [];
  public user$: Observable<IUser | undefined> = new Observable<IUser | undefined>();

  constructor(private reportService: VetReportsService, private animalService: AnimalService, private authService: AuthService) {
    this.reports$ = this.reportService.reports$;
    this.report$ = this.reportService.report$;
    this.animals$ = this.animalService.animals$;
    this.user$ = this.authService.user$
  }

  ngOnInit(){
    this.reportService.fetchReports()
    this.animalService.fetchAllData()

    this.animals$.subscribe(a => {
      this.animals = a
    })

    console.log(this.reports$)
    console.log(this.animals$)
  }

  public getAnimalSpecies(id: number | undefined): string {
    if(id){
      let animal = this.animals.find(a => a.id === id)
      return animal?.speciesData.name ?? '';
    } else {
      return ''
    }
  }

  public getDetailedReport(id: number | undefined) {
    if(id){
      this.reportService.fetchReport(id.toString());
    }
  }

  public nullifyReport() {
    this.reportService.fetchReport('0');
  }

  public deleteReport(id: number | undefined) {
    if(id) this.reportService.deleteReport(id.toString());
  }

}
