import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IFeeding} from "../interfaces/feeding.interface";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {IFeedingDTO} from "../interfaces/feedingDTO.interface";

@Injectable({
  providedIn: 'root'
})
export class FeedingService {
  apiUrl: string = '';

  private feedings: BehaviorSubject<IFeeding[]> = new BehaviorSubject<IFeeding[]>([]);
  public feedings$: Observable<IFeeding[]> = this.feedings.asObservable();


  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,) {
    this.apiUrl = this.apiService.getapiUrl();
  }

  fetchFeedings(){
    this.http.get<IFeeding[]>(`${this.apiUrl}/EmployeeFeedings`)
      .subscribe(feedings => this.feedings.next(feedings));
  }

  postFeeding(feeding: IFeedingDTO){
    this.http.post(`${this.apiUrl}/EmployeeFeedings`, feeding)
      .subscribe({
        next: (response) => {
          alert('Rapport créé avec succès');
          this.router.navigateByUrl('/admin/zoo-management/feedings')
        },
        error: (error) => {
          alert('Échec de la création du rapport')
        }
      });
  }

  deleteFeeding(id: number) {
    this.http.delete(`${this.apiUrl}/EmployeeFeedings/${id}`)
      .subscribe(ef => this.fetchFeedings());
  }
}
