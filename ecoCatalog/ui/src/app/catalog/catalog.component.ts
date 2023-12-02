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

  ngOnInit(): void {
    this.databaseService.getFullCatalog().subscribe({
      next: (response) => { 
        this.fullCatalog = response;
      }
    })
    this.dataSource.data = this.fullCatalog;
  }
  
}
