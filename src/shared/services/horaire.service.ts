import {Injectable} from '@angular/core';
import {IHoraires} from "../interfaces/horaires.interface";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces/user.interface";
import {IHorairesDTO} from "../interfaces/horairesDTO.interface";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class HoraireService {
  //PROPS
  private apiUrl: string = '';

  private horaires: BehaviorSubject<IHoraires[]> = new BehaviorSubject<IHoraires[]>([])
  public horaires$: Observable<IHoraires[]> = this.horaires.asObservable();

  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isOpen$: Observable<boolean> = this.isOpen.asObservable();

  private rawData: BehaviorSubject<IHoraires[]> = new BehaviorSubject<IHoraires[]>([]);
  public rawData$ = this.rawData.asObservable();

  private uniqueRawData: BehaviorSubject<IHorairesDTO | null> = new BehaviorSubject<IHorairesDTO | null>(null);
  public uniqueRawData$ = this.uniqueRawData.asObservable();

//CTOR
  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
    setInterval(this.isItOpen.bind(this), 6000);
  }

//GET
  public fetchData() {
    this.http.get<any[]>(`${this.apiUrl}/OpeningHours`).pipe(
      map(hours => hours.map(hour => ({
        id: hour.id,
        dayOfWeek: hour.dayOfWeek,
        morningOpening: this.convertTimeToDate(hour.morningOpening),
        morningClosing: this.convertTimeToDate(hour.morningClosing),
        afternoonOpening: this.convertTimeToDate(hour.afternoonOpening),
        afternoonClosing: this.convertTimeToDate(hour.afternoonClosing)
      })))
    ).subscribe(transformedHours => {
      this.horaires.next(transformedHours);
      this.isItOpen();
    });
  }


  public fetchRawData() {
    this.http.get<IHoraires[]>(`${this.apiUrl}/OpeningHours`)
      .subscribe( a => {
        this.rawData.next(a);
      });
  }

  public fetchUniqueRawData(id: number) {
    this.http.get<IHorairesDTO>(`${this.apiUrl}/OpeningHours/${id}`)
      .subscribe( a => {
        this.uniqueRawData.next(a);
      });
  }

  //PUT
  public updateHoraire(id: string, fd: FormData) {
    this.http.put(`${this.apiUrl}/OpeningHours/${id}`, fd)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/zoo-management/opening-hours');
      },
      error: (error) => {
      }
    });
  }

  public convertTimeToDate(timeString: string | null): Date | null {
    if (timeString === null) {
      return null;
    }
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  public isItOpen() {

    const now = new Date();
    const today = now.toLocaleString('fr-FR', { weekday: 'long' });
    const todayHours = this.horaires.value.find(h => h.dayOfWeek.toLowerCase() === today.toLowerCase());

    if (!todayHours || !todayHours.morningOpening || !todayHours.morningClosing || !todayHours.afternoonOpening || !todayHours.afternoonClosing) {
      this.isOpen.next(false);
      return;
    }

    const currentTime = new Date(1970, 0, 1, now.getHours(), now.getMinutes(), now.getSeconds());
    const morningOpening = new Date(1970, 0, 1, todayHours.morningOpening.getHours(), todayHours.morningOpening.getMinutes());
    const morningClosing = new Date(1970, 0, 1, todayHours.morningClosing.getHours(), todayHours.morningClosing.getMinutes());
    const afternoonOpening = new Date(1970, 0, 1, todayHours.afternoonOpening.getHours(), todayHours.afternoonOpening.getMinutes());
    const afternoonClosing = new Date(1970, 0, 1, todayHours.afternoonClosing.getHours(), todayHours.afternoonClosing.getMinutes());

    if ((currentTime >= morningOpening && currentTime <= morningClosing) || (currentTime >= afternoonOpening && currentTime <= afternoonClosing)) {
      this.isOpen.next(true);
    } else {
      this.isOpen.next(false);
    }
  }
}
