import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IReview} from "../interfaces/review.interface";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {ToastNotifService} from "./toast-notif.service";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl: string = '';

  private validatedReviews: BehaviorSubject<IReview[]> = new BehaviorSubject<IReview[]>([])
  public validatedReviews$ = this.validatedReviews.asObservable();

  private unvalidatedReviews: BehaviorSubject<IReview[]> = new BehaviorSubject<IReview[]>([])
  public unvalidatedReviews$ = this.unvalidatedReviews.asObservable();


  constructor(private http: HttpClient,
              private router: Router,
              private apiService: ApiService,
              private toast: ToastNotifService) {
    this.apiUrl = this.apiService.getapiUrl();
  }

  //GET
  public fetchValidatedReviews() {
    this.http.get<IReview[]>(`${this.apiUrl}/Reviews`)
      .subscribe(r => this.validatedReviews.next(r))
  }

  public fetchUnvalidatedReviews() {
    this.http.get<IReview[]>(`${this.apiUrl}/Reviews/unvalidated`)
      .subscribe(r => this.unvalidatedReviews.next(r))
  }

  //PUT
  public updateReview(id: string, review: IReview) {
    this.http.put(`${this.apiUrl}/Reviews/${id}`, review)
      .subscribe({
        next: (response) => {
          this.fetchUnvalidatedReviews();
          this.fetchValidatedReviews();
        },
        error: (error) => {
        }
      });
  }

  //POST
  public postReview(review: IReview) {
    this.http.post<IReview>(`${this.apiUrl}/Reviews`, review)
      .subscribe({
        next: (r) => {
          this.toast.showToast("Avis en attente de validation. Merci!", true)
          this.router.navigateByUrl('/')
        },
        error: (e) => {
          this.toast.showToast("Échec de l'envoi de l'avis", false)
        }
      })
  }

  //DELETE
  deleteReview(id: string) {
    this.http.delete(`${this.apiUrl}/Reviews/${id}`).subscribe(r => {
      this.fetchUnvalidatedReviews()
      this.fetchValidatedReviews();
    })
  }
}
