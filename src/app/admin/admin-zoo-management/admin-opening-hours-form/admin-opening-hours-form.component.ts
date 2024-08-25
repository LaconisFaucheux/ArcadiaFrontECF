import {Component} from '@angular/core';
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
  DayOfWeek = new FormControl<string>('')
  MorningOpeningHour = new FormControl<string>('');
  MorningClosingHour = new FormControl<string>('');
  AfternoonOpeningHour = new FormControl<string>('');
  AfternoonClosingHour = new FormControl<string>('');


  constructor(private horaireService: HoraireService,
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

    if (this.id) {
      this.horaire$.subscribe(horaire => {
        if (horaire) {
          this.DayOfWeek.setValue(horaire.dayOfWeek);
          this.MorningOpeningHour.setValue(horaire.morningOpening);
          this.MorningClosingHour.setValue(horaire.morningClosing);
          this.AfternoonOpeningHour.setValue(horaire.afternoonOpening);
          this.AfternoonClosingHour.setValue(horaire.afternoonClosing);
        }
      });
    }

  }

  submit() {
    if (!this.id || !this.DayOfWeek.value) return;

    const fd = new FormData();

    const horaireDTO: IHorairesDTO = {
      id: parseInt(this.id),
      dayOfWeek: this.DayOfWeek.value,
      morningOpening: this.MorningOpeningHour.value,
      morningClosing: this.MorningClosingHour.value,
      afternoonOpening: this.AfternoonOpeningHour.value,
      afternoonClosing: this.AfternoonClosingHour.value,
    }

    fd.append('id', this.id);
    fd.append('dayOfWeek', horaireDTO.dayOfWeek);
    if (horaireDTO.morningOpening) {
      fd.append('morningOpening', horaireDTO.morningOpening);
    }
    if (horaireDTO.morningClosing) {
      fd.append('morningClosing', horaireDTO.morningClosing);
    }
    if (horaireDTO.afternoonOpening) {
      fd.append('afternoonOpening', horaireDTO.afternoonOpening);
    }
    if (horaireDTO.afternoonClosing) {
      fd.append('afternoonClosing', horaireDTO.afternoonClosing);
    }

    this.horaireService.updateHoraire(this.id, fd)

  }

  nullifyTime(field: string, event: any) {
    if (event.target.checked) {
      switch (field) {
        case 'MorningOpening':
          this.MorningOpeningHour.setValue(null);
          break;
        case 'MorningClosing':
          this.MorningClosingHour.setValue(null);
          break;
        case'AfternoonOpening':
          this.AfternoonOpeningHour.setValue(null);
          break;
        case 'AfternoonClosing':
          this.AfternoonClosingHour.setValue(null);
          break;
        default:
          break;
      }
    } else {
      switch (field) {
        case 'MorningOpening':
          this.MorningOpeningHour.setValue('09:00:00');
          break;
        case 'MorningClosing':
          this.MorningClosingHour.setValue('12:00:00');
          break;
        case'AfternoonOpening':
          this.AfternoonOpeningHour.setValue('14:00:00');
          break;
        case 'AfternoonClosing':
          this.AfternoonClosingHour.setValue('19:00:00');
          break;
        default:
          break;
      }
    }
  }
}
