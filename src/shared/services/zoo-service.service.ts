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

  private zooService: BehaviorSubject<IZooService | undefined> = new BehaviorSubject<IZooService | undefined>(undefined)
  public zooService$ = this.zooService.asObservable();

  constructor(private http: HttpClient) {}

  //GET
  public fetchAllData() {
    this.http.get<IZooService[]>('https://localhost:7015/api/ZooServices')
      .subscribe(zooServices => {
        this.zooServices.next(zooServices)
      });
  }

  public fetchUniqueService(id: number) {
    this.http.get<IZooService>(`https://localhost:7015/api/ZooServices/${id}`)
      .subscribe(zooService => {
        this.zooService.next(zooService)
      });
  }

  //POST
  public createService(fd: FormData){
    this.http.post(`https://localhost:7015/api/ZooServices`, fd)
      .subscribe({
        next: (response) => {
          console.log('Request successful', response);
        },
        error: (error) => {
          console.error('Request failed', error);
        }
      });
  }

  //PUT
  public updateService(id: string, fd: FormData){
    this.http.put(`https://localhost:7015/api/ZooServices/${id}/`, fd)
      .subscribe({
        next: (response) => {
          console.log('Request successful', response);
        },
        error: (error) => {
          console.error('Request failed', error);
        }
      });
  }

  //DELETE
  deleteService(id: number) {
    this.http.delete(`https://localhost:7015/api/ZooServices/${id}`).subscribe(zs => {
      this.fetchAllData();
    })
  }

  public getZooServices() {
    return this.zooServices$;
  }


}
