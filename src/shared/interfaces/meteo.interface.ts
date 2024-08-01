export interface IMeteo{
  "city": {
  "name": string,
    "latitude": number,
    "longitude": number,
    "altitude": number,
    "country": string,
    "city": string
},
  "update": Date,
  "forecast": {
  "latitude": number,
    "longitude": number,
    "datetime": Date,
    "wind10m": number,
    "gust10m": number,
    "dirwind10m": number,
    "weather": number,
    "probafrost": number,
    "probafog": number,
    "probawind70": number,
    "probawind100": number,
    "day": number,
    "rr10": number,
    "rr1": number,
    "tmin": number,
    "tmax": number,
    "sun_hours": number,
    "etp": number,
    "gustx": number,
    "country": string,
    "city": string
}

}
