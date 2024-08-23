import { Component } from '@angular/core';
import {IHorairesDTO} from "../../../../shared/interfaces/horairesDTO.interface";
import {Observable} from "rxjs";
import {HoraireService} from "../../../../shared/services/horaire.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {IHoraires} from "../../../../shared/interfaces/horaires.interface";
import {IAnimal} from "../../../../shared/interfaces/animal.interface";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, TitleCasePipe, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-admin-opening-hours-form',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    TitleCasePipe,
    UpperCasePipe
  ],
  templateUrl: './admin-opening-hours-form.component.html',
  styleUrl: './admin-opening-hours-form.component.css'
})
export class AdminOpeningHoursFormComponent {

  //PROPS
  public horaire$: Observable<IHorairesDTO | null> = new Observable<IHorairesDTO | null>();
  public id: string | null = '';

  //FORM CONTROLS
  MorningOpeningHour = new FormControl<string>('');
  MorningClosingHour = new FormControl<string>('');
  AfternoonOpeningHour = new FormControl<string>('');
  AfternoonClosingHour = new FormControl<string>('');




  constructor( private horaireService: HoraireService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.horaire$ = this.horaireService.uniqueRawData$
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.horaireService.fetchUniqueRawData(parseInt(this.id));
      }
    });

    if(this.id){
      this.horaire$.subscribe(horaire => {
        if(horaire){
          this.MorningOpeningHour.setValue(horaire.morningOpening);
          this.MorningClosingHour.setValue(horaire.morningClosing);
          this.AfternoonOpeningHour.setValue(horaire.afternoonOpening);
          this.AfternoonClosingHour.setValue(horaire.afternoonClosing);
        }
      });
    }

  }

  resetForm(){}

  submit(){}

  nullifyTime(field: string, event: any){}

}
