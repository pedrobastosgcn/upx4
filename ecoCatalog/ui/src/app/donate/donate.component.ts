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
  donationList: Donation[] = [];

  constructor(
    private fb : FormBuilder,
    private databaseService : DatabaseService) { 
    this.newDonation = fb.group({
      person_name: [null],
      donator_comment: [null],
      amount: [null],
    })
  }

  ngOnInit(): void {
    this.updateList();
  }

  insertDonation(){
    const newDonationEntry = this.newDonation.value as Donation;
    this.databaseService.addNewDonation(newDonationEntry).subscribe({
      next: () => this.updateList()
    })
  }

  updateList() {
    this.databaseService.getFullDescDonatorList().subscribe({
      next: (response) => {
        this.donationList = response;
      }
    })
  }

}
