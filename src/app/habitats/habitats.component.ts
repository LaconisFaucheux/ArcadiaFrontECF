import { Component } from '@angular/core';
import {HabitatsDetailComponent} from "./habitats-detail/habitats-detail.component";
import {HabitatsListComponent} from "./habitats-list/habitats-list.component";
import {IHabitat} from "../../shared/interfaces/habitat.interface";
import {IAnimal} from "../../shared/interfaces/animal.interface";

@Component({
  selector: 'app-habitats',
  standalone: true,
  imports: [
    HabitatsDetailComponent,
    HabitatsListComponent
  ],
  templateUrl: './habitats.component.html',
  styleUrl: './habitats.component.css'
})
export class HabitatsComponent {
  habitats: IHabitat[] = [
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
    },
    {
      id: 2,
      name: "jungle",
      description: "Descriptif de la jungle",
      pics: [
        {
          id: 2,
          slug: "images/habitats/Jungle.jpg",
          miniSlug: "x",
          idHabitat: 2
        }
      ]
    },
    {
      id: 3,
      name: "marais",
      description: "Descriptif des marais",
      pics: [
        {
          id: 3,
          slug: "images/habitats/Marais.jpg",
          miniSlug: "x",
          idHabitat: 3
        }
      ]
    }
  ]
  inhabitants: IAnimal[] = [
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
        habitats: []
      },
      healthData: {
        id: 0,
        state: ""
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
        habitats: []
      },
      healthData: {
        id: 0,
        state: ""
      }
    }
  ]

}
