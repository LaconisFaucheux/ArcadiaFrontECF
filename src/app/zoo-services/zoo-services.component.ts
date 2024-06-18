import {Component} from '@angular/core';
import {IZooService} from "../../shared/interfaces/zoo-service.interface";

@Component({
  selector: 'app-zoo-services',
  standalone: true,
  imports: [],
  templateUrl: './zoo-services.component.html',
  styleUrl: './zoo-services.component.css'
})
export class ZooServicesComponent {
  zooServices: IZooService[] =
    [
      {
        id: 1,
        name: "Restauration",
        description: "Le Zoo Arcadia propose un espace de restauration convivial et familial pour vous restaurer au cours de votre visite",
        fullPrice: null,
        childPrice: null
      },
      {
        id: 2,
        name: "Visite guidée",
        description: "Le Zoo Arcadia vous propose une prestation de visite guidée",
        fullPrice: 0,
        childPrice: 0
      },
      {
        id: 3,
        name: "Visite en petit train",
        description: "Le Zoo Arcadia vous propose une visite en petit train pour les gros flemmards qui veulent pas marcher",
        fullPrice: 10,
        childPrice: 5
      }
    ]
  ;
}
