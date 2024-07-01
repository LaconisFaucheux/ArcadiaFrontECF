import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IReview} from "../interfaces/review.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: BehaviorSubject<IReview[]> = new BehaviorSubject<IReview[]>([])
  public reviews$ = this.reviews.asObservable();

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  public fetchData() {
    //retirer le /unfiltered à la mise en prod
    this.http.get<IReview[]>('https://localhost:7015/api/Reviews/unfiltered').subscribe(r => this.reviews.next(r))
  }
}
