import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatDialog } from '@angular/material';
import { FirestoreStorageService } from 'src/app/firebase-cloudstoredb/firestore-storage.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  displayedColumns: string[] = ['TransactionId','User','Roll','Item','Time','Total Amount'];
  displayedItemColumns:string[] = ['FoodName','Price','Quantity'];
  dataSource= [];
  startDate:string;
  durationInSeconds = 5;
  endDate:string;

  constructor(public dialog: MatDialog,
    private storageService:FirestoreStorageService) { }

  ngOnInit() {
    
  }

  minDate = new Date(2019, 4, 14);

  onStartDate(startDate: MatDatepickerInputEvent<Date>){
    let dd =String(startDate.value.getDate()).padStart(2, '0');
    let mm = String(startDate.value.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = startDate.value.getFullYear();

    this.startDate = dd + "-" + mm+ '-' + yyyy;
  }

  onEndDate(endDate: MatDatepickerInputEvent<Date>){
    let dd =String(endDate.value.getDate()).padStart(2, '0');
    let mm = String(endDate.value.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = endDate.value.getFullYear();

    this.endDate = dd + "-" + mm+ '-' + yyyy;
    
  }

  onSubmit(){
    
    if(this.startDate!==undefined && this.endDate!==undefined){
      this.storageService.fetchTransactionDetails(this.startDate,this.endDate).subscribe(
        val =>{
          this.dataSource = val;
        }
      );
      
    }else{
      this.dialog.open(DialogContentExampleDialog).afterClosed();
    }
    
  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './pop-up-box/dialog-overview-example-dialog.html',
})
export class DialogContentExampleDialog {}