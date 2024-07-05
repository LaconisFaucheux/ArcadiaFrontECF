import {Injectable} from '@angular/core';
import {IHoraires} from "../interfaces/horaires.interface";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HoraireService {
  //PROPS
  public horaires: BehaviorSubject<IHoraires[]> = new BehaviorSubject<IHoraires[]>([])
  public horaires$: Observable<IHoraires[]> = this.horaires.asObservable();

  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isOpen$: Observable<boolean> = this.isOpen.asObservable();

//CTOR
  constructor(private http: HttpClient) {
    setInterval(this.isItOpen.bind(this), 1000);
  }

//METHODS
  public fetchData() {
    this.http.get<any[]>('https://localhost:7015/api/OpeningHours').pipe(
      map(hours => hours.map(hour => ({
        id: hour.id,
        dayOfWeek: hour.dayOfWeek,
        morningOpening: this.convertTimeToDate(hour.morningOpening),
        morningClosing: this.convertTimeToDate(hour.morningClosing),
        afternoonOpening: this.convertTimeToDate(hour.afternoonOpening),
        afternoonClosing: this.convertTimeToDate(hour.afternoonClosing)
      })))
    ).subscribe(transformedHours => this.horaires.next(transformedHours));
  }

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
}
