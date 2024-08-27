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

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private animals: BehaviorSubject<IAnimal[]> = new BehaviorSubject<IAnimal[]>([]);
  public animals$ = this.animals.asObservable();

  private animal: BehaviorSubject<IAnimal> = new BehaviorSubject<IAnimal>(this.animals.value[0]);
  public animal$ = this.animal.asObservable();

  private inhabitants: BehaviorSubject<IAnimal[]> = new BehaviorSubject<IAnimal[]>([]);
  public inhabitants$ = this.inhabitants.asObservable();

  private animalsListLength: number = 0;

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
    private cookieService: CookieService,
    private router: Router) {
  }

  //GET
  fetchDiets(){
    this.http.get<IDiet[]>(
      'https://localhost:7015/api/Diets')
      .subscribe(diets => {
        this.diets.next(diets)
      })
  }

  fetchUnits(){
    this.http.get<ISizeUnit[]>(
      'https://localhost:7015/api/SizeUnits')
      .subscribe(sizeUnit => {
        this.sizeUnit.next(sizeUnit)
      });
    this.http.get<IWeightUnit[]>(
      'https://localhost:7015/api/WeightUnits')
      .subscribe(weightUnit => {
        this.weightUnit.next(weightUnit)
      })
  }

  fetchSpecies() {
    this.http.get<ISpecies[]>(
      'https://localhost:7015/api/Species')
      .subscribe(species => {
        this.species.next(species)
    });
  }

  fetchUniqueSpecies(id: number) {
    this.http.get<ISpecies>(
      `https://localhost:7015/api/Species/${id}`)
      .subscribe(species => {
        this.uniqueSpecies.next(species)
    });
  }

  fetchAllData() {
    this.http.get<IAnimal[]>(
      'https://localhost:7015/api/Animals')
      .subscribe(animals => {
        this.animals.next(animals)
      });
  }

  fetchUniqueAnimal(id: number) {
    this.http.get<IAnimal>(`https://localhost:7015/api/Animals/${id}`)
      .subscribe(animal => {
        this.animal.next(animal)
      });
  }

  fetchRandomAnimal() {
    let rnd;
    this.http.get<number>(`https://localhost:7015/api/Animals/length`)
      .subscribe(length => {
        this.animalsListLength = length
        rnd = Math.floor(Math.random() * (this.animalsListLength + 1));
        this.http.get<IAnimal>(`https://localhost:7015/api/Animals/${rnd}`)
          .subscribe(animal => {
            this.randomAnimal.next(animal)
          });
      })
  }

  fetchInhabitantsByHabitatId(habitatId: number) {
    this.http.get<IAnimal[]>(`https://localhost:7015/api/Animals/byHabitat/${habitatId}`)
      .subscribe(animals => {
        this.inhabitants.next(animals)
      });
  }

  fetchHealth() {
    this.http.get<IHealth[]>(`https://localhost:7015/api/Healths`)
      .subscribe(h => {
        this.health.next(h)
      });
  }

  //POST
  createAnimal(fd: FormData) {
    this.http.post(`https://localhost:7015/api/Animals`, fd)
      .subscribe({
        next: (response) => {
          alert('Animal créé avec succès!')
          this.router.navigateByUrl('/admin/zoo-management/animals')
        },
        error: (error) => {
          alert('Echec de la création de l\'animal')
        }
      });
  }

  createSpecies(fd: FormData) {
    this.http.post(`https://localhost:7015/api/Species`, fd)
      .subscribe({
        next: (response) => {
          alert('Espèce créée avec succès!')
          this.router.navigateByUrl('/admin/zoo-management/species')
        },
        error: (error) => {
          alert('Echec de la création de l\'espèce');
        }
      });
  }

  //PUT
  updateAnimal(animalId: string, fd: FormData) {
    this.http.put(`https://localhost:7015/api/Animals/${animalId}/`, fd)
      .subscribe({
        next: (response) => {
          alert('Mise à jour réussie!')
          this.router.navigateByUrl('/admin/zoo-management/animals')
        },
        error: (error) => {
          alert('Échec de la mise à jour')
        }
      });
  }

  updateSpecies(speciesId: string, fd: FormData) {
    this.http.put(`https://localhost:7015/api/Species/${speciesId}/`, fd)
      .subscribe({
        next: (response) => {
          alert('Mise à jour réussie!')
          this.router.navigateByUrl('/admin/zoo-management/species')
        },
        error: (error) => {
          alert('Échec de la mise à jour')
        }
      });
  }

  //DELETE
  deleteAnimal(id: number) {
    this.http.delete(`https://localhost:7015/api/Animals/${id}`).subscribe({
      next: (response) => {
        this.fetchAllData()
      },
      error: (error) => {
      }

    })
  }

  deleteSpecies(id: number) {
    this.http.delete(`https://localhost:7015/api/Species/${id}`).subscribe({
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

  getInhabitants(): Observable<IAnimal[]> {
    return this.inhabitants$;
  }
}
