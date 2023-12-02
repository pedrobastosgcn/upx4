import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalog } from '../interfaces/catalog';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  url: string = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getFullCatalog() : Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.url + '/api/fullCatalog');
  }


}
