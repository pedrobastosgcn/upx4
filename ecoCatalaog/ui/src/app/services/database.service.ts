import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalog } from '../interfaces/catalog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  url: string = 'localhost:4200'
  constructor(private http : HttpClient) { }

  getFullCatalog() : Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.url + '/api/fullCatalog');
  }


}
