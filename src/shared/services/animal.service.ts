import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IAnimal} from "../interfaces/animal.interface";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ISpecies} from "../interfaces/species.interface";
import {ISizeUnit} from "../interfaces/sizeUnit.interface";
import {IWeightUnit} from "../interfaces/weightUnit.interface";
import {IDiet} from "../interfaces/diet.interface";
import {IHealth} from "../interfaces/health.interface";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {DashboardService} from "./dashboard.service";
import {ToastrService} from "ngx-toastr";
import {ToastNotifService} from "./toast-notif.service";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  apiUrl: string = '';

  private animals: BehaviorSubject<IAnimal[]> = new BehaviorSubject<IAnimal[]>([]);
  public animals$ = this.animals.asObservable();

  private animal: BehaviorSubject<IAnimal> = new BehaviorSubject<IAnimal>(this.animals.value[0]);
  public animal$ = this.animal.asObservable();

  private inhabitants: BehaviorSubject<IAnimal[]> = new BehaviorSubject<IAnimal[]>([]);
  public inhabitants$ = this.inhabitants.asObservable();

  private animalsListLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public animalsListLength$ = this.animalsListLength.asObservable();

  private randomAnimal: BehaviorSubject<IAnimal | null> = new BehaviorSubject<IAnimal | null>(null);
  public randomAnimal$ = this.randomAnimal.asObservable();

  private species: BehaviorSubject<ISpecies[]> = new BehaviorSubject<ISpecies[]>([]);
  public species$ = this.species.asObservable();

  private uniqueSpecies: BehaviorSubject<ISpecies | null> = new BehaviorSubject<ISpecies | null>(null);
  public uniqueSpecies$ = this.uniqueSpecies.asObservable();

  private sizeUnit: BehaviorSubject<ISizeUnit[]> = new BehaviorSubject<ISizeUnit[]>([]);
  public sizeUnit$ = this.sizeUnit.asObservable();

  private weightUnit: BehaviorSubject<IWeightUnit[]> = new BehaviorSubject<IWeightUnit[]>([]);
  public weightUnit$ = this.weightUnit.asObservable();

  private diets: BehaviorSubject<IDiet[]> = new BehaviorSubject<IDiet[]>([]);
  public diets$ = this.diets.asObservable();

  private health: BehaviorSubject<IHealth[]> = new BehaviorSubject<IHealth[]>([]);
  public health$ = this.health.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private dashboardService: DashboardService,
    private toast: ToastNotifService) {
    this.apiUrl = this.apiService.getapiUrl();
  }

  //GET
  fetchDiets(){
    this.http.get<IDiet[]>(
      `${this.apiUrl}/Diets`)
      .subscribe(diets => {
        this.diets.next(diets)
      })
  }

  fetchUnits(){
    this.http.get<ISizeUnit[]>(
      `${this.apiUrl}/SizeUnits`)
      .subscribe(sizeUnit => {
        this.sizeUnit.next(sizeUnit)
      });
    this.http.get<IWeightUnit[]>(
      `${this.apiUrl}/WeightUnits`)
      .subscribe(weightUnit => {
        this.weightUnit.next(weightUnit)
      })
  }

  fetchSpecies() {
    this.http.get<ISpecies[]>(
      `${this.apiUrl}/Species`)
      .subscribe(species => {
        this.species.next(species)
    });
  }

  fetchUniqueSpecies(id: number) {
    this.http.get<ISpecies>(
      `${this.apiUrl}/Species/${id}`)
      .subscribe(species => {
        this.uniqueSpecies.next(species)
    });
  }

  fetchAllData() {
    this.http.get<IAnimal[]>(
      `${this.apiUrl}/Animals`)
      .subscribe(animals => {
        this.animals.next(animals)
      });
  }

  fetchUniqueAnimal(id: number) {
    this.http.get<IAnimal>(`${this.apiUrl}/Animals/${id}`)
      .subscribe(animal => {
        this.animal.next(animal)
      });
  }

  fetchRandomAnimal() {
    let rnd;
    this.http.get<number>(`${this.apiUrl}/Animals/length`)
      .subscribe(length => {
        this.animalsListLength.next(length);
        rnd = Math.floor(Math.random() * (this.animalsListLength.value + 1));
        this.http.get<IAnimal>(`${this.apiUrl}/Animals/${rnd}`)
          .subscribe(animal => {
            this.randomAnimal.next(animal)
          });
      })
  }

  fetchInhabitantsByHabitatId(habitatId: number) {
    this.http.get<IAnimal[]>(`${this.apiUrl}/Animals/byHabitat/${habitatId}`)
      .subscribe(animals => {
        this.inhabitants.next(animals)
      });
  }

  fetchHealth() {
    this.http.get<IHealth[]>(`${this.apiUrl}/Healths`)
      .subscribe(h => {
        this.health.next(h)
      });
  }

  //POST
  createAnimal(fd: FormData) {
    this.http.post<IAnimal>(`${this.apiUrl}/Animals`, fd)
      .subscribe({
        next: (response) => {
          this.toast.showToast('Animal créé avec succès!', true)
          this.fetchUniqueSpecies(response.idSpecies)
          this.dashboardService.createAnimalStat({
            id: null,
            animalId: response.id!,
            name: response.name,
            speciesName: this.uniqueSpecies.value?.name ?? '',
            miniSlug: response.pics[0].miniSlug,
            nbClics: 0
          })
          this.router.navigateByUrl('/admin/zoo-management/animals')
        },
        error: (error) => {
          this.toast.showToast('Echec de la création de l\'animal', false)
        }
      });
  }

  createSpecies(fd: FormData) {
    this.http.post(`${this.apiUrl}/Species`, fd)
      .subscribe({
        next: (response) => {
          this.toast.showToast('Espèce créée avec succès!', true)
          this.router.navigateByUrl('/admin/zoo-management/species')
        },
        error: (error) => {
          this.toast.showToast('Echec de la création de l\'espèce', false);
        }
      });
  }

  //PUT
  updateAnimal(animalId: string, fd: FormData) {
    this.http.put(`${this.apiUrl}/Animals/${animalId}/`, fd)
      .subscribe({
        next: (response) => {
          this.toast.showToast('Mise à jour réussie!', true)
          this.router.navigateByUrl('/admin/zoo-management/animals')
        },
        error: (error) => {
          this.toast.showToast('Échec de la mise à jour', false)
        }
      });
  }

  updateSpecies(speciesId: string, fd: FormData) {
    this.http.put(`${this.apiUrl}/Species/${speciesId}/`, fd)
      .subscribe({
        next: (response) => {
          this.toast.showToast('Mise à jour réussie!', true)
          this.router.navigateByUrl('/admin/zoo-management/species')
        },
        error: (error) => {
          this.toast.showToast('Échec de la mise à jour', false)
        }
      });
  }

  //DELETE
  deleteAnimal(id: number) {
    this.http.delete(`${this.apiUrl}/Animals/${id}`).subscribe({
      next: (response) => {
        this.fetchAllData()
      },
      error: (error) => {
      }

    })
  }

  deleteSpecies(id: number) {
    this.http.delete(`${this.apiUrl}/Species/${id}`).subscribe({
      next: (response) => {
        this.fetchSpecies()
      },
      error: (error) => {
        alert("Suppression impossible: Avez-vous vérifié que d'autres animaux de cette espèce ne sont pas encore enregistrés?")
        console.error('Request failed', error);
      }
    });
  }



  //GETTERS
  getAnimals(): Observable<IAnimal[]> {
    return this.animals$;
  }

  getAnimal(): Observable<IAnimal> {
    return this.animal$;
  }

  getAnimalListLength(){
    return this.animalsListLength$
  }

  getInhabitants(): Observable<IAnimal[]> {
    return this.inhabitants$;
  }
}
