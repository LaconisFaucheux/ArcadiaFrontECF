import { Injectable } from '@angular/core';
import {IMeteo} from "../interfaces/meteo.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private meteo: BehaviorSubject<IMeteo | null> = new BehaviorSubject<IMeteo | null>(null);
  public meteo$ : Observable<IMeteo|null> = this.meteo as Observable<IMeteo|null>

  public weatherCodes: { [key: number]: string }= {
    0: 'sun',
    1: 'cloudysun',
    2: 'cloudysun',
    3: 'cloud',
    4: 'cloud',
    5: 'cloud',
    6: 'fog',
    7: 'fog',
    10: 'lightrain',
    11: 'lightrain',
    12: 'heavyrain',
    13: 'lightrain',
    14: 'lightrain',
    15: 'heavyrain',
    16: 'lightrain',
    20: 'lightsnow',
    21: 'lightsnow',
    22: 'heavysnow',
    30: 'lightsnow',
    31: 'lightsnow',
    32: 'heavysnow',
    40: 'lightrain',
    41: 'lightrain',
    42: 'heavyrain',
    43: 'lightrain',
    44: 'lightrain',
    45: 'heavyrain',
    46: 'lightrain',
    47: 'heavyrain',
    48: 'heavyrain',
    60: 'lightsnow',
    61: 'lightsnow',
    62: 'heavysnow',
    63: 'lightsnow',
    64: 'lightsnow',
    65: 'heavysnow',
    66: 'lightsnow',
    67: 'lightsnow',
    68: 'heavysnow',
    70: 'lightsnow',
    71: 'lightsnow',
    72: 'heavysnow',
    73: 'lightsnow',
    74: 'lightsnow',
    75: 'heavysnow',
    76: 'heavysnow',
    77: 'heavysnow',
    78: 'heavysnow',
    100: 'thunderstorm',
    101: 'thunderstorm',
    102: 'heavythunderstorm',
    103: 'thunderstorm',
    104: 'thunderstorm',
    105: 'heavythunderstorm',
    106: 'thunderstorm',
    107: 'thunderstorm',
    108: 'heavythunderstorm',
    120: 'thunderstorm',
    121: 'thunderstorm',
    122: 'thunderstorm',
    123: 'thunderstorm',
    124: 'thunderstorm',
    125: 'thunderstorm',
    126: 'thunderstorm',
    127: 'thunderstorm',
    128: 'thunderstorm',
    130: 'thunderstorm',
    131: 'thunderstorm',
    132: 'heavythunderstorm',
    133: 'thunderstorm',
    134: 'thunderstorm',
    135: 'heavythunderstorm',
    136: 'thunderstorm',
    137: 'thunderstorm',
    138: 'heavythunderstorm',
    140: 'thunderstorm',
    141: 'thunderstorm',
    142: 'thunderstorm',
    210: 'lightrain',
    211: 'lightrain',
    212: 'heavyrain',
    230: 'lightrain',
    231: 'lightrain',
    232: 'lightrain',
    235: 'hail',
  }


  constructor(private http: HttpClient) {
  }

  public fetchMeteo(){
    this.http.get<IMeteo>('https://api.meteo-concept.com/api/forecast/daily/0?latlng=48.01667%2C-2.18333&world=false&token=21334663c3f36b33a33fd7b22c3934a4ad770c359dee95613b74d1bfb7059623')
      .subscribe(meteo => this.meteo.next(meteo));
  }
}
