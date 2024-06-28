import {Injectable} from '@angular/core';
import {IHoraires} from "../interfaces/horaires.interface";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HoraireService {
  public horaires: BehaviorSubject<IHoraires[]> = new BehaviorSubject<IHoraires[]>([
    {
      id: 1,
      dayOfWeek: "Lundi",
      morningOpening: this.convertTimeToDate("09:00:00"),
      morningClosing: this.convertTimeToDate("12:00:00"),
      afternoonOpening: this.convertTimeToDate("12:00:00"),
      afternoonClosing: this.convertTimeToDate("19:00:00")
    },
    {
      id: 2,
      dayOfWeek: "Mardi",
      morningOpening: this.convertTimeToDate("09:00:00"),
      morningClosing: this.convertTimeToDate("14:00:00"),
      afternoonOpening: this.convertTimeToDate("14:00:00"),
      afternoonClosing: this.convertTimeToDate("19:00:00")
    },
    {
      id: 3,
      dayOfWeek: "Mercredi",
      morningOpening: this.convertTimeToDate("09:00:00"),
      morningClosing: this.convertTimeToDate("12:00:00"),
      afternoonOpening: this.convertTimeToDate("14:00:00"),
      afternoonClosing: this.convertTimeToDate("19:00:00")
    },
    {
      id: 4,
      dayOfWeek: "Jeudi",
      morningOpening: this.convertTimeToDate("09:00:00"),
      morningClosing: this.convertTimeToDate("12:00:00"),
      afternoonOpening: this.convertTimeToDate("14:00:00"),
      afternoonClosing: this.convertTimeToDate("19:00:00")
    },
    {
      id: 5,
      dayOfWeek: "Vendredi",
      morningOpening: this.convertTimeToDate("09:00:00"),
      morningClosing: this.convertTimeToDate("12:00:00"),
      afternoonOpening: this.convertTimeToDate("14:00:00"),
      afternoonClosing: this.convertTimeToDate("19:00:00")
    },
    {
      id: 6,
      dayOfWeek: "Samedi",
      morningOpening: this.convertTimeToDate("09:00:00"),
      morningClosing: this.convertTimeToDate("12:00:00"),
      afternoonOpening: this.convertTimeToDate("14:00:00"),
      afternoonClosing: this.convertTimeToDate("19:00:00")
    },
    {
      id: 7,
      dayOfWeek: "Dimanche",
      morningOpening: this.convertTimeToDate(null),
      morningClosing: this.convertTimeToDate(null),
      afternoonOpening: this.convertTimeToDate(null),
      afternoonClosing: this.convertTimeToDate(null)
    }
  ])
  public horaires$: Observable<IHoraires[]> = this.horaires.asObservable();

  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isOpen$: Observable<boolean> = this.isOpen.asObservable();

  public convertTimeToDate(timeString: string | null): Date | null {

    if (timeString === null) {
      return null;
    }
    const [hours, minutes, seconds] = timeString.split(":");
    return new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
  }

  public isItOpen() {
    const now = new Date();
    const today = now.toLocaleString('fr-FR', {weekday: 'long'});

// if(this.horaires$ === undefined){return}//WTF???
    const todayHours = this.horaires.value.find(h => h.dayOfWeek.toLowerCase() === today.toLowerCase());

    if (todayHours === null || todayHours === undefined) {
      this.isOpen.next(false);
      return;
    }
    if (todayHours.morningOpening === null
      || todayHours.morningClosing === null
      || todayHours.afternoonOpening === null
      || todayHours.afternoonClosing === null) {
      this.isOpen.next(false);
      return;
    }
    const currentTime = this.convertTimeToDate(now.toTimeString().split(' ')[0]);

    if (currentTime === null || currentTime === undefined) {
      this.isOpen.next(false);
      return;
    }

    if (currentTime >= todayHours.morningOpening
      && currentTime <= todayHours.morningClosing
      || currentTime >= todayHours.afternoonOpening
      && currentTime <= todayHours.afternoonClosing) {
      this.isOpen.next(true);
      return;
    }
  }

  constructor() {
    this.isItOpen()
    setInterval(this.isItOpen.bind(this), 30000);
  }
}
