import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Catalog } from '../interfaces/catalog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  displayedColumns: string[] = ['id', 'material', 'decomposition_time', 'time_unit'];
  fullCatalog!: Catalog[];
  dataSource = new MatTableDataSource<Catalog>;

  constructor(private databaseService : DatabaseService) { }

  // o ngOnInit está chamando o service que faz a requisição para API para obter o catálogo completo, isso é feito para preencher a tabela inicialmente
  ngOnInit(): void {
    this.databaseService.getFullCatalog().subscribe({
      next: (response) => {
        this.fullCatalog = response; 
        this.dataSource = new MatTableDataSource(this.fullCatalog);;
      }
    })
  }
  
}
