import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {IAnimal} from "../interfaces/animal.interface";
import {IZooService} from "../interfaces/zoo-service.interface";

@Injectable({
  providedIn: 'root'
})
export class ZooServiceService {
  private zooServices: BehaviorSubject<IZooService[]> = new BehaviorSubject<IZooService[]>([]);
  public zooServices$ = this.zooServices.asObservable();

  constructor(private http: HttpClient) {}

  public fetchAllData() {
    this.http.get<IZooService[]>('https://localhost:7015/api/ZooServices')
      .subscribe(zooServices => {
        this.zooServices.next(zooServices)
      });
  }

  public getZooServices() {
    return this.zooServices$;
  }


}
