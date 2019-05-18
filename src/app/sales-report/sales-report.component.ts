import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { FirestoreStorageService } from '../firebase-cloudstoredb/firestore-storage.service';
import { DialogContentExampleDialog } from '../transaction/transaction-history/transaction-history.component';

interface Temp{
  foodname:string;
  quantity:number;
}


@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})

export class SalesReportComponent implements OnInit {

  minDate = new Date(2019, 4, 14);
  startDate:string;
  durationInSeconds = 5;
  endDate:string;
  dataSource= [];
  dataSource2 = new MatTableDataSource(this.dataSource);
  displayedColumns: string[] = ['foodname','quantity'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private storageService:FirestoreStorageService) { }

  ngOnInit() {
    this.dataSource2.sort = this.sort;

  }

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
      this.storageService.fetchSalesInformation(this.startDate,this.endDate).subscribe(
        (val) =>{
          let dataSources= val;
          dataSources.sort(this.compare);
         
          this.dataSource2.data = this.findSales(dataSources);
        }
      );;
      
    }else{
      this.dialog.open(DialogContentExampleDialog).afterClosed();
    }
  }

  findSales(dataSource) {
    let data = []
        let tmp=0
    for (let index = 0; index < dataSource.length-1; index++) {
         
      if (dataSource[index].foodname===dataSource[index+1].foodname && index!==dataSource.length-2 ) {

        if (tmp!=0) {
          tmp += dataSource[index+1].quantity;
        } else{
          
          tmp = dataSource[index].quantity + dataSource[index+1].quantity;
        }
             
      } else if(  index===0 && (dataSource[index].foodname!==dataSource[index+1].foodname)){

        data.push({foodname:dataSource[index].foodname,quantity:dataSource[index].quantity});

      }else if(dataSource[index].foodname!==dataSource[index+1].foodname && dataSource[index].foodname!==dataSource[index-1].foodname){

        
          if (index===dataSource.length-2) {
            data.push({foodname:dataSource[index].foodname,quantity:dataSource[index].quantity});
            data.push({foodname:dataSource[index+1].foodname,quantity:dataSource[index+1].quantity});
          }else{
            data.push({foodname:dataSource[index].foodname,quantity:dataSource[index].quantity});
          }
      
      }else if(dataSource[index].foodname===dataSource[index+1].foodname && index===dataSource.length-2){

        if (tmp!=0) {
          tmp += dataSource[index+1].quantity;
        } else{
          
          tmp = dataSource[index].quantity + dataSource[index+1].quantity;
        }
        data.push({foodname:dataSource[index].foodname,quantity:tmp});
        tmp =0;
        
        
      } else{

        data.push({foodname:dataSource[index].foodname,quantity:tmp});
        tmp =0;

      }
      
    }

    return data;

  }
    
  compare( a, b ) {
      if ( a.foodname < b.foodname ){
        return -1;
      }
      if ( a.foodname > b.foodname ){
        return 1;
      }
      return 0;
    }

}
