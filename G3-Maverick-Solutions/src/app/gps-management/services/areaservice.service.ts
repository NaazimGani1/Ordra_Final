import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Area } from '../model/area.model';
import { Status } from '../model/status.model';
import { Province } from '../model/province.model';


@Injectable({
  providedIn: 'root'
})
export class AreaserviceService {

  areaData: Area;
  areaList: Area[];

  provinceData: Province;
  provinceList: Province[];

  statusData: Status;
  statusList: Status[];


  allareaData: Area;
  allareaList: Area[];

  constructor(private http: HttpClient) { }

  //use to populate lists
  getAreas() {
    return this.http.get(environment.ApiUrl + '/Areas').toPromise();
  }

  getStatus() {
    return this.http.get(environment.ApiUrl + '/Area_Status').toPromise();
  }

  getProvince() {
    return this.http.get(environment.ApiUrl + '/Provinces').toPromise();
  }
  //end populate list 

  //use for search
  search(formData) {
    return this.http.post(environment.ApiUrl  + '/Search/searchArea', formData);
  }

  //Use for update 

  getArea(obj: Area) {
    return this.http.get(environment.ApiUrl + '/Areas/' + obj.AreaID).toPromise();
  }

  postArea(formData) {
    return this.http.post(environment.ApiUrl + '/Areas', formData);
  }

  putArea(obj: Area) {
    return this.http.put(environment.ApiUrl + '/Areas/' + obj.AreaID, obj);
  }

  deleteArea(id: number) {
    return this.http.delete(environment.ApiUrl + '/Areas/' + id);
  }
}
