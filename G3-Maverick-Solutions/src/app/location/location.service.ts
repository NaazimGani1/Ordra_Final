import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Area } from '../gps-management/model/area.model';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) { }  
  url = 'https://localhost:44399/Api/Location'; 
  
  getAllLocations(): Observable<Location[]> {  
    return this.http.get<Location[]>(this.url + '/getAllLocations');  
  }

  addLocation(Location: Location): Observable<Location> {  
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
      return this.http.post<Location>(this.url + '/addLocation',  
      Location, httpOptions);  
    }  

    getAllAreas(): Observable<Area[]>{
      return this.http.get<Area[]>(this.url + '/GetAllAreas');
    }
  
    getAllContainers(): Observable<Container[]>{
      return this.http.get<Container[]>(this.url + '/GetAllContainers');
    }

  }

