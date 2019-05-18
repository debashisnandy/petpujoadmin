import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FoodItem } from '../main-pages/shared/food.module';
import { Observable } from 'rxjs';
import { OrderItem } from '../main-pages/shared/order.module';

interface CafereriaItem{
  cafeteria:FoodItem[];
}



interface TransactionDetails{
  orderItems: OrderItem[];
  date:number;
  time: string;
  roll:string;
  totalAmount: number;
  user:string;
  transactionId:string;
}




interface SaleDetails{
  quantity:number;
  foodname:string;
  date:number;
}


@Injectable()
export class FirestoreStorageService {

  todoCollectionRef: AngularFirestoreCollection<FoodItem>;
  salesInformation: AngularFirestoreCollection<SaleDetails>;
  orderCollectionRef: AngularFirestoreCollection<TransactionDetails>;
 
  todo$: Observable<FoodItem[]>;

  constructor(private afs: AngularFirestore) { }

  onAddCafeteriaRecipe(foods:FoodItem[]){
    this.todoCollectionRef = this.afs.collection<FoodItem>('cafeteria-menu');
    
    foods.forEach(
      (value,index) =>{
        this.todoCollectionRef.doc(index.toString()).set({foodname: value.foodname,amount: value.amount});
      }
    );
  }

  fetchItemFromCafeteria(){
    this.todoCollectionRef = this.afs.collection<FoodItem>('cafeteria-menu');
     this.todo$ =this.todoCollectionRef.valueChanges();
    
    return this.todo$;

  }

  onAddCanteenRecipe(foods:FoodItem[]){
    this.todoCollectionRef = this.afs.collection<FoodItem>('canteen-menu');
   
    foods.forEach(
      (value,index) =>{
        this.todoCollectionRef.doc(index.toString()).set({foodname: value.foodname,amount: value.amount});
        
      }
    );
  }

  fetchItemFromCanteen(){
    this.todoCollectionRef = this.afs.collection<FoodItem>('canteen-menu');
     this.todo$ =this.todoCollectionRef.valueChanges();

    return this.todo$;

  }

  fetchTransactionDetails(startDate:string,endDate:string){

    
    
    const startDay:number = +startDate.replace(/-/g,"");
    const endDay:number = +endDate.replace(/-/g,"");
    

    if (startDay===endDay) {
      this.orderCollectionRef = this.afs.collection('transactions',ref=>{
        return ref.where('date','==',startDay);
      });
     let a:Observable<TransactionDetails[]> = this.orderCollectionRef.valueChanges();
     return a;
      
    } else if((endDay> startDay)){
      this.orderCollectionRef = this.afs.collection('transactions',ref=>{
        return ref.where('date','>=',startDay).where('date','<=',endDay);
      });
     let a:Observable<TransactionDetails[]> = this.orderCollectionRef.valueChanges();
     return a;
    }
  }


  fetchSalesInformation(startDate:string,endDate:string){

    const startDay:number = +startDate.replace(/-/g,"");
    const endDay:number = +endDate.replace(/-/g,"");

    this.salesInformation = this.afs.collection('sales');
    if (startDay===endDay) {
      this.salesInformation = this.afs.collection('sales',ref=>{
        return ref.orderBy('foodname').where('date','==',startDay);
      });
     let a:Observable<SaleDetails[]> = this.salesInformation.valueChanges();
     return a;
      
    } else if((endDay> startDay)){
      this.salesInformation = this.afs.collection('sales',ref=>{
        return ref.orderBy('date').orderBy('foodname').where('date','>=',startDay).where('date','<=',endDay);
      });
      let a:Observable<SaleDetails[]> = this.salesInformation.valueChanges();
      return a;
    }


  }

  
}
