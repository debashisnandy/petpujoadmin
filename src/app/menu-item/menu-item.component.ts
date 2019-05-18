import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromMenu from './store/food.reduser';
import * as MenuAction from './store/food.action';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FoodItem } from '../main-pages/shared/food.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirestoreStorageService } from '../firebase-cloudstoredb/firestore-storage.service';


export interface DialogData {
  foodName: string;
  amount: number;
}

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  menuList:Observable<fromMenu.State>;
  displayedColumns: string[] = ['foodName','amount','button'];
  dataSource= [];
  durationInSeconds = 5;
  id: string;
  foodName: string;
  amount: number;
  data1: DialogData;

  constructor(private store:Store<fromApp.AppState>,
    public dialog:MatDialog,
    private snackBar: MatSnackBar,
    private router:Router,
    private route: ActivatedRoute,
    private firebaseMenuStore:FirestoreStorageService) { }

  ngOnInit() {
    this.menuList = this.store.select('foodItem');
    
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      
      if (this.id === "cafeteria"){
        this.firebaseMenuStore.fetchItemFromCafeteria().subscribe(
          (food) =>{
            this.store.dispatch(new MenuAction.AddMenu(food));
          }
        );
      } else if(this.id === "canteen"){
        this.firebaseMenuStore.fetchItemFromCanteen().subscribe(
          (food) =>{
            this.store.dispatch(new MenuAction.AddMenu(food));
          }
        );
      }
    });

    

    this.menuList.subscribe(
      (food:fromMenu.State) =>{
        this.dataSource = food.foods;
      }
    );
    
  }


  onLoadToServer() {
    if (this.id === "cafeteria"){
      this.router.navigate(['/main/place']);
      this.firebaseMenuStore.onAddCafeteriaRecipe(this.dataSource);
    } else if(this.id === "canteen"){
      this.router.navigate(['/main/place']);
      this.firebaseMenuStore.onAddCanteenRecipe(this.dataSource);
    }
  }

  onFetchServer(){
    this.firebaseMenuStore.fetchItemFromCafeteria();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {foodName: this.foodName, amount: this.amount}
    });

    dialogRef.afterClosed().subscribe(result => {
     
      this.data1 = result;
      if (this.data1 !== undefined) {
        this.store.dispatch(new MenuAction.SetMenu(new FoodItem(this.data1.foodName,this.data1.amount)));
      } else{
        this.openSnackBar();
      }
      
    });

    
  }

  public modifyDialog(foodName:string,amount:number,itemNo:number): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {foodName: foodName, amount: amount}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.data1 = result;
      this.store.dispatch(new MenuAction.ModifyMenu({index: itemNo ,item: new FoodItem(this.data1.foodName,this.data1.amount)}));
    });
  }
  
  public delItem(index:number){
    this.store.dispatch(new MenuAction.DeleteMenu(index));
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NoDataInsertedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './pop-up-box/dialog-overview-example-dialog.html',
  styleUrls: ['./pop-up-box/pop-up-box.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: './custom-snackbar/snack-bar-component-example-snack.html',
})
export class NoDataInsertedComponent {}