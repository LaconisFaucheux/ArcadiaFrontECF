import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {IAnimal} from "../interfaces/animal.interface";
import {IZooService} from "../interfaces/zoo-service.interface";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ZooServiceService {
  apiUrl: string = '';

  private zooServices: BehaviorSubject<IZooService[]> = new BehaviorSubject<IZooService[]>([]);
  public zooServices$ = this.zooServices.asObservable();

  private zooService: BehaviorSubject<IZooService | undefined> = new BehaviorSubject<IZooService | undefined>(undefined)
  public zooService$ = this.zooService.asObservable();

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
  }

  //GET
  public fetchAllData() {
    this.http.get<IZooService[]>(`${this.apiUrl}/ZooServices`)
      .subscribe(zooServices => {
        this.zooServices.next(zooServices)
      });
  }

  public fetchUniqueService(id: number) {
    this.http.get<IZooService>(`${this.apiUrl}/ZooServices/${id}`)
      .subscribe(zooService => {
        this.zooService.next(zooService)
      });
  }

  //POST
  public createService(fd: FormData){
    this.http.post(`${this.apiUrl}/ZooServices`, fd)
      .subscribe({
        next: (response) => {
          alert('Service créé avec succès!')
          this.router.navigateByUrl('/admin/zoo-management/services')
        },
        error: (error) => {
          alert('Échec de la création du service')
        }
      });
  }

  //PUT
  public updateService(id: string, fd: FormData){
    this.http.put(`${this.apiUrl}/ZooServices/${id}/`, fd)
      .subscribe({
        next: (response) => {
          alert('Mise à jour réussie!')
          this.router.navigateByUrl('/admin/zoo-management/services')
        },
        error: (error) => {
          alert('Échec de la mise à jour')
        }
      });
  }

  //DELETE
  deleteService(id: number) {
    this.http.delete(`${this.apiUrl}/ZooServices/${id}`).subscribe(zs => {
      this.fetchAllData();
    })
  }

  public getZooServices() {
    return this.zooServices$;
  }


}
