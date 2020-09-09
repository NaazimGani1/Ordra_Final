import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Area } from '../model/area.model';
import { Locationstatus } from '../model/locationstatus.model';
import { Container } from '../model/container.model';
import { Location } from '../model/location.model';


@Injectable({
  providedIn: 'root'
})
export class LocationserviceService {

  locationData: Location;
  locationList: Location[];
  
  areaData: Area;
  areaList: Area[];

  containerData: Container;
  containerList: Container[];

  locationstatusData: Locationstatus;
  locationstatusList: Locationstatus[];


  alllocationData: Location;
  alllocationList: Location[];

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44399/Api/Location'; 

  //use to populate lists
  getAllLocations() {
    return this.http.get(this.url + '/getAllLocations').toPromise();
  }

  getAllStatusses() {
    return this.http.get(this.url + '/GetAllStatusses').toPromise();
  }

  getAllContainers() {
    return this.http.get(this.url + '/GetAllContainers').toPromise();
  }

  getAllAreas() {
    return this.http.get(this.url + '/GetAllAreas').toPromise();
  }
  //end populate list 

//use for search
search(formData) {
  return this.http.post(environment.ApiUrl  + '/Search/searchLocation', formData);
}


getLocation(obj: Location) {
  return this.http.get(this.url + '/getLocation/' + obj.LocationID).toPromise();
}

postLocation(formData) {
  return this.http.post(this.url + '/Locations', formData);
}

putLocation(obj: Location) {
  return this.http.put(this.url + '/Locations/' + obj.LocationID, obj);
}


}
