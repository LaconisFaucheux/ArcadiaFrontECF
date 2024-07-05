import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IReview} from "../interfaces/review.interface";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: BehaviorSubject<IReview[]> = new BehaviorSubject<IReview[]>([])
  public reviews$ = this.reviews.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  public fetchData() {
    //retirer le /unfiltered à la mise en prod
    this.http.get<IReview[]>('https://localhost:7015/api/Reviews/unfiltered').subscribe(r => this.reviews.next(r))
  }

  public postReview(review: IReview) {
    this.http.post<IReview>('https://localhost:7015/api/Reviews', review).subscribe(r => {
      this.router.navigateByUrl('/');
      this.fetchData() //bien utile dans la mesure où de toute façon un employé doit valider l'avis avant qu'il soit visible? => A retirer à la mise en prod
    })
  }
}
