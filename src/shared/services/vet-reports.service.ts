import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IVetReport} from "../interfaces/vet-reports.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class VetReportsService {
  private apiUrl: string = '';

  private reports: BehaviorSubject<IVetReport[]> = new BehaviorSubject<IVetReport[]>([]);
  public reports$: Observable<IVetReport[]> = this.reports.asObservable();

  private report: BehaviorSubject<IVetReport | null> = new BehaviorSubject<IVetReport | null>(null);
  public report$: Observable<IVetReport | null> = this.report.asObservable();

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
  }

  //GET
  fetchReports() {
    this.http.get<IVetReport[]>(`${this.apiUrl}/VetVisits`)
      .subscribe(r => this.reports.next(r));
  }

  fetchReport(id: string) {
    if(id !== '0') {
      this.http.get<IVetReport>(`${this.apiUrl}/VetVisits/${id}`)
        .subscribe(r => this.report.next(r));
    } else {
      this.report.next(null);
    }
  }

  //POST
  createReport(report: FormData) {
    this.http.post(`${this.apiUrl}/VetVisits`, report)
      .subscribe({
      next: (response) => {
        alert('Rapport créé avec succès');
        this.router.navigateByUrl('/admin/vet-reports')
      },
      error: (error) => {
        alert('Échec de la création du rapport')
      }
    });
  }

  //DELETE
  deleteReport(id: string) {
    this.http.delete(`${this.apiUrl}/VetVisits/${id}`).subscribe( vr => {
      this.fetchReports()
    })
  }


}
