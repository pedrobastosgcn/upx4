import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Donation } from '../interfaces/donation';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  newDonation: FormGroup;
  topDonatorsList: Donation[] = [];
  recentDonatorsList: Donation[] = [];

  constructor(
    private fb : FormBuilder,
    private databaseService : DatabaseService) { 
    this.newDonation = fb.group({
      person_name: [null],
      donator_comment: [null],
      amount: [null],
    })
  }

  /**
   * @description o OnInit lifecycle hook chama a função para preencher as listas de novas e últimas doações
   */
  ngOnInit(): void {
    this.updateLists();
  }

  /**
   * @description A função é chamada pelo botão de doar e faz uma request para o backend para adicionar a nova doação
   */
  insertDonation(){
    const newDonationEntry = this.newDonation.value as Donation;
    this.databaseService.addNewDonation(newDonationEntry).subscribe({
      next: () => this.updateLists()
    })
  }

  /**
   * @description A função é chamada ao carregar a pagina e ao incluir uma nova doação, ela atualiza a lista das doações recentes e das maiores doações, para refletir no front
   */
  updateLists() {
    this.databaseService.getTopDonatorsList().subscribe({
      next: (response) => {
        this.topDonatorsList = response;
      }
    });
    this.databaseService.getRecentDonatorsList().subscribe({
      next: (response) => {
        this.recentDonatorsList = response;
      }
    })
  }

}
