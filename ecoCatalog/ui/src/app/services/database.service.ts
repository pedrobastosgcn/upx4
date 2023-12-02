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

  /**
   * @description A função acessa a rota do nosso backend /api/fullCatalog para obter a lista completa de materiais e seus tempos de decomposição
   * @returns Observable do tipo Catalog[]
   */
  getFullCatalog() : Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.url + '/api/full-catalog');
  }

  /**
   * @description A função faz um post no backend para salvar um novo registro na tablea de catalog
   * @param catalog 
   * @returns 
   */
  postNewCatalogItem(catalog: Catalog) : Observable<Catalog> {
    return this.http.post<Catalog>(this.url + '/api/catalog-item', catalog);
  }


}
