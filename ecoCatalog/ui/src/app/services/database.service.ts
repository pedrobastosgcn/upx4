import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalog } from '../interfaces/catalog';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Donation } from '../interfaces/donation';

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

  /**
   * @description A função acessa a rota do backend /api/donations para obter a lista completa de donations em ordem decrescente de amount
   * @returns Observable do tipo Donation[]
   */
  getTopDonatorsList() : Observable<Donation[]> {
    return this.http.get<Donation[]>(this.url + '/api/top-donations?desc=true');
  }

  /**
   * @description A função acessa a rota do backend /api/recent-donations para pegar as últimas 10 doações realizadas
   * @returns Observable do tipo Donation[]
   */
  getRecentDonatorsList() : Observable<Donation[]> {
    return this.http.get<Donation[]>(this.url + '/api/recent-donations');
  }

  /**
   * @description A função adiciona uma nova entrada de doação ao banco de dados
   * @param donation 
   * @returns Observable do tipo Donation
   */
  addNewDonation(donation: Donation) : Observable<Donation> {
    return this.http.post<Donation>(this.url + '/api/donation', donation);
  }



}
