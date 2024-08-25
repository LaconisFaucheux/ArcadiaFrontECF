import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IReview} from "../interfaces/review.interface";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private validatedReviews: BehaviorSubject<IReview[]> = new BehaviorSubject<IReview[]>([])
  public validatedReviews$ = this.validatedReviews.asObservable();

  private unvalidatedReviews: BehaviorSubject<IReview[]> = new BehaviorSubject<IReview[]>([])
  public unvalidatedReviews$ = this.unvalidatedReviews.asObservable();


  constructor(private http: HttpClient, private router: Router) {
  }

  //GET
  public fetchValidatedReviews() {
    this.http.get<IReview[]>('https://localhost:7015/api/Reviews')
      .subscribe(r => this.validatedReviews.next(r))
  }

  public fetchUnvalidatedReviews() {
    this.http.get<IReview[]>('https://localhost:7015/api/Reviews/unvalidated')
      .subscribe(r => this.unvalidatedReviews.next(r))
  }

  //PUT
  public updateReview(id: string, review: IReview) {
    this.http.put(`https://localhost:7015/api/Reviews/${id}`, review)
      .subscribe({
        next: (response) => {
          console.log('Request successful', response);
          this.fetchUnvalidatedReviews();
          this.fetchValidatedReviews();
        },
        error: (error) => {
          console.error('Request failed', error);
        }
      });

  }

  //POST
  public postReview(review: IReview) {
    this.http.post<IReview>('https://localhost:7015/api/Reviews', review).subscribe(r => {
      this.router.navigateByUrl('/');
    })
  }

  //DELETE
  deleteReview(id: string) {
    this.http.delete(`https://localhost:7015/api/Reviews/${id}`).subscribe(r => {
      this.fetchUnvalidatedReviews()
      this.fetchValidatedReviews();
    })
  }
}
