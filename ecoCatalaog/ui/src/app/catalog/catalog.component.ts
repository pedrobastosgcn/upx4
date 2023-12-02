import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { NgIfContext } from '@angular/common';
import { Catalog } from '../interfaces/catalog';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  fullCatalog!: Catalog[];

  constructor(private databaseService : DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getFullCatalog().subscribe({
      next: (response) => { 
        this.fullCatalog = response;
      }
    })
  }
  
}
