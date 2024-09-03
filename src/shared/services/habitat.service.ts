import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IHabitat} from "../interfaces/habitat.interface";
import {HttpClient} from "@angular/common/http";
import {IHabitatDTO} from "../interfaces/habitatDTO.interface";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  //PROPS
  apiUrl: string = '';

  private habitats: BehaviorSubject<IHabitat[]> = new BehaviorSubject<IHabitat[]>([]);
  public habitats$ = this.habitats.asObservable();

  private habitat: BehaviorSubject<IHabitat> = new BehaviorSubject(this.habitats.value[0]);
  public habitat$ = this.habitat.asObservable();

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
  }

  //GET
  fetchAllData() {
    this.http.get<IHabitat[]>(`${this.apiUrl}/Habitats`)
      .subscribe(habitats => this.habitats.next(habitats));
  }

  fetchUniqueHabitat(id: number){
    this.http.get<IHabitat>(`${this.apiUrl}/Habitats/${id}`)
      .subscribe(habitat => this.habitat.next(habitat));
  }

  //POST
  createHabitat(fd: FormData){
    this.http.post(`${this.apiUrl}/Habitats`, fd)
      .subscribe({
        next: (response) => {
          alert('Habitat créé avec succès!')
          this.router.navigateByUrl('/admin/zoo-management/habitats')
        },
        error: (error) => {
          alert('Échec de la création de l\'habitat')
        }
      });
  }

  //PUT
  updateHabitat(id: string, fd: FormData){
    this.http.put(`${this.apiUrl}/Habitats/${id}/`, fd)
      .subscribe({
        next: (response) => {
          alert('Mise à jour réussie')
          this.router.navigateByUrl('/admin/zoo-management/habitats')
        },
        error: (error) => {
          alert('Échec de la mise à jour')
        }
      });
  }

  //DELETE
  deleteHabitat(id: number){
    this.http.delete(`${this.apiUrl}/Habitats/${id}`).subscribe( h => {
      this.fetchAllData();
    })
  }

  //GETTERS
  getHabitats(): Observable<IHabitat[]> {
    return this.habitats$;
  }
  getHabitatsIds(): number[] {
    const hab = this.habitats.value;
    const arr: number[] = []
    for(let h of hab){
      arr.push(h.id);
    }
    return arr;
  }
  getHabitat(): Observable<IHabitat> {
    return this.habitat$;
  }
}
