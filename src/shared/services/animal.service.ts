import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IAnimal} from "../interfaces/animal.interface";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  public animals$: BehaviorSubject<IAnimal[]> = new BehaviorSubject<IAnimal[]>([
    {
      id: 1,
      name: "Mufasa",
      isMale: true,
      idSpecies: 1,
      idHealth: 1,
      pics: [
        {
          id: 1,
          slug: "images/animals/638496693869536018_Mufasa.jpg",
          miniSlug: "images/animals/638496693869536822_Mufasa_mini.jpg",
          idAnimal: 1
        }
      ],
      speciesData: {
        id: 1,
        name: "Lion",
        scientificName: "Panthera Leo",
        description: "Le lion est le seul félin véritablement social puisqu'il vit en groupe comprenant généralement une coalition de mâles adultes (souvent apparentés), plusieurs femelles adultes et leurs jeunes. Toutefois l'organisation est de type fission/fusion, c'est à dire que les individus vont et viennent (solitaires ou dispersés en petites unités autonomes) et ne se regroupent qu'occasionnellement. Les femelles font preuve de comportements coopératifs uniques chez les félins : elles mettent bas en synchronie, élèvent les jeunes en communauté en autorisant l'alloparentage et chassent en groupe. Il y a plus de 10 000 ans, les lions étaient nombreux en Europe, en Asie et en Afrique. Aujourd’hui, on ne les rencontre plus qu’en Afrique et au nord-ouest de l’Inde où 200 spécimens subsistent dans la réserve de Gir.",
        maleMaxSize: 2.5,
        femaleMaxSize: 1.9,
        maleMaxWeight: 190,
        femaleMaxWeight: 120,
        idSizeUnit: 2,
        idWeightUnit: 2,
        lifespan: 15,
        idDiet: 2,
        sizeUnit: {
          id: 2,
          name: "mètre",
          abbr: "m"
        },
        weightUnit: {
          id: 2,
          name: "kilogramme",
          abbr: "kg"
        },
        diet: {
          id: 2,
          name: "carnivore"
        },
        habitats: [
          {
            id: 1,
            name: "savane",
            description: "descriptif de la savane",
            pics: [
              {
                id: 1,
                slug: "images/habitats/Savane.jpg",
                miniSlug: "x",
                idHabitat: 1
              }
            ]
          }
        ]
      },
      healthData: {
        id: 1,
        state: "En bonne santé"
      }
    },
    {
      id: 2,
      name: "Sarabi",
      isMale: false,
      idSpecies: 1,
      idHealth: 1,
      pics: [
        {
          id: 2,
          slug: "images/animals/638496693873204536_Mufasa.jpg",
          miniSlug: "images/animals/638496693873204641_Mufasa_mini.jpg",
          idAnimal: 2
        }
      ],
      speciesData: {
        id: 1,
        name: "Lion",
        scientificName: "Panthera Leo",
        description: "Le lion est le seul félin véritablement social puisqu'il vit en groupe comprenant généralement une coalition de mâles adultes (souvent apparentés), plusieurs femelles adultes et leurs jeunes. Toutefois l'organisation est de type fission/fusion, c'est à dire que les individus vont et viennent (solitaires ou dispersés en petites unités autonomes) et ne se regroupent qu'occasionnellement. Les femelles font preuve de comportements coopératifs uniques chez les félins : elles mettent bas en synchronie, élèvent les jeunes en communauté en autorisant l'alloparentage et chassent en groupe. Il y a plus de 10 000 ans, les lions étaient nombreux en Europe, en Asie et en Afrique. Aujourd’hui, on ne les rencontre plus qu’en Afrique et au nord-ouest de l’Inde où 200 spécimens subsistent dans la réserve de Gir.",
        maleMaxSize: 2.5,
        femaleMaxSize: 1.9,
        maleMaxWeight: 190,
        femaleMaxWeight: 120,
        idSizeUnit: 2,
        idWeightUnit: 2,
        lifespan: 15,
        idDiet: 2,
        sizeUnit: {
          id: 0,
          name: "",
          abbr: ""
        },
        weightUnit: {
          id: 0,
          name: "",
          abbr: ""
        },
        diet: {
          id: 0,
          name: ""
        },
        habitats: [          {
          id: 1,
          name: "savane",
          description: "descriptif de la savane",
          pics: [
            {
              id: 1,
              slug: "images/habitats/Savane.jpg",
              miniSlug: "x",
              idHabitat: 1
            }
          ]
        }]
      },
      healthData: {
        id: 0,
        state: ""
      }
    },
    {
      id: 3,
      name: "Bohort",
      isMale: true,
      idSpecies: 2,
      idHealth: 1,
      pics: [
        {
          id: 3,
          slug: "images/animals/l_orang_outan1.jpg",
          miniSlug: "x",
          idAnimal: 3
        }
      ],
      speciesData: {
        id: 2,
        name: "Orang-Outan de Bornéo",
        scientificName: "Pongo Pygmaeus",
        description: "Orang-outan signifie « homme des bois » en malais. L’orang-outan est semi-solitaire et des regroupements peuvent être observés lorsque la nourriture est abondante. Les mâles dominants établissent leur territoire sur ceux, plus petits, des femelles, et tentent d’en interdire l’accès aux autres mâles. Lorsque deux mâles dominants se rencontrent en présence d’une femelle réceptive, la confrontation est agressive. Au contraire des femelles qui établissent leur territoire à proximité de leur lieu de naissance à l’âge adulte, les mâles s’éloignent des individus avec lesquels ils ont des liens de parenté pour  s'implanter sur un territoire. L'orang-outan est le plus grand animal arboricole et son physique est parfaitement adapté à la vie de grimpeur suspendu dans la canopée. Les femelles ne descendent quasi jamais au sol alors que les mâles peuvent y être contraints lorsque les arbres des forêts secondaires ne peuvent supporter leur poids. Son régime alimentaire se compose de plus de 200 fruits différents dont certains à la coque très dure qu'il parvient à briser grâce à ses mâchoires puissantes. Les femelles donnent généralement naissance à leur premier petit vers l'âge de 15 ans et ne seront mères qu'à 4 ou 5 reprises dans leur vie, l'intervalle entre chaque naissance étant particulièrement long chez cette espèce : entre 6 et 7 ans. Chaque soir, l’orang-outan se confectionne un nid de branchages qu’il érige dans une fourche d’arbre à 10 ou 20 mètres de hauteur. L’orang-outan est en danger dans son biotope, principalement à cause de la déforestation pour l'exploitation du bois et la conversion en cultures de palmiers à huile, mais aussi pour le commerce illégal des jeunes en Asie.",
        maleMaxSize: 97,
        femaleMaxSize: null,
        maleMaxWeight: 85,
        femaleMaxWeight: 60,
        idSizeUnit: 1,
        idWeightUnit: 2,
        lifespan: 50,
        idDiet: 1,
        sizeUnit: {
          id: 0,
          name: "",
          abbr: ""
        },
        weightUnit: {
          id: 0,
          name: "",
          abbr: ""
        },
        diet: {
          id: 0,
          name: ""
        },
        habitats: [          {
          id: 2,
          name: "jungle",
          description: "descriptif de la jungle",
          pics: [
            {
              id: 1,
              slug: "images/habitats/Jungle.jpg",
              miniSlug: "x",
              idHabitat: 1
            }
          ]
        }]
      },
      healthData: {
        id: 0,
        state: ""
      }
    }
  ]);
  public animal$: BehaviorSubject<IAnimal> = new BehaviorSubject<IAnimal>(this.animals$.value[0]);
  public inhabitants$: BehaviorSubject<IAnimal[]> = new BehaviorSubject<IAnimal[]>([]);

  constructor() {

  }

  public selectAnimal(index: number): void {
    console.log('id from service = ' + index);
    let tmp: IAnimal | undefined = this.animals$.value.find(a => a.id === index);
    if (tmp) {
      this.animal$.next(tmp);
    }
  }

  public getInhabitants(habitatId: number): void {
    this.inhabitants$.next(
      this.animals$.value.filter(a => a.speciesData.habitats.some(
        h => h.id === habitatId))
    );
  }

  public getRandomAnimal(){
    let randomIndex = Math.floor(Math.random() * (this.animals$.value.length + 1));
    return this.animals$.value[randomIndex];
  }
}
