import { Component } from '@angular/core';
import {IHoraires} from "../../../../shared/interfaces/horaires.interface";
import { Observable } from 'rxjs';
import {HoraireService} from "../../../../shared/services/horaire.service";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-admin-opening-hours-management',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './admin-opening-hours-management.component.html',
  styleUrl: './admin-opening-hours-management.component.css'
})
export class AdminOpeningHoursManagementComponent {
  public openingHours$: Observable<IHoraires[]> = new Observable<IHoraires[]>();


  constructor(private horairesService: HoraireService
  ) {
    this.openingHours$ = this.horairesService.rawData$
  }

  ngOnInit() {
    this.horairesService.fetchRawData();
  }

}
