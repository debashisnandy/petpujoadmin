import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './main-pages/header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SelectResturantComponent } from './resturant/select-resturant/select-resturant.component';
import { CanteenResturantComponent } from './resturant/canteen-resturant/canteen-resturant.component';
import { CafeteriaResturantComponent } from './resturant/cafeteria-resturant/cafeteria-resturant.component';
import { MenuItemComponent, DialogOverviewExampleDialog, NoDataInsertedComponent } from './menu-item/menu-item.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/app.reducer';
import { MatComponentModule } from './main-pages/mat-component/mat-component.module';
import { TransactionHistoryComponent, DialogContentExampleDialog } from './transaction/transaction-history/transaction-history.component';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { SigninComponent } from './signin/signin.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule,FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthGuard } from './auth/auth-guard.service';
import { InvalidAuthComponent, ChangePasswordSuccessComponent, ChangePasswordFailedComponent, UserCreatedComponent } from './auth/invalid-auth.component';
import { UserAuthService } from './auth/user-auth.service';
import { LoginGuard } from './auth/login-guard.service';
import { FirestoreStorageService } from './firebase-cloudstoredb/firestore-storage.service';
import { MatDatepickerModule } from '@angular/material';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { CreateAccountComponent } from './admin-profile/create-account/create-account.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectResturantComponent,
    CanteenResturantComponent,
    CafeteriaResturantComponent,
    MenuItemComponent,
    DialogOverviewExampleDialog,
    NoDataInsertedComponent,
    InvalidAuthComponent,
    TransactionHistoryComponent,
    DialogContentExampleDialog,
    MainPagesComponent,
    SigninComponent,
    SalesReportComponent,
    AdminProfileComponent,
    ChangePasswordSuccessComponent,
    ChangePasswordFailedComponent,
    CreateAccountComponent,
    UserCreatedComponent
  ],
  entryComponents:[DialogOverviewExampleDialog,
    UserCreatedComponent,
    ChangePasswordFailedComponent,
    ChangePasswordSuccessComponent,
    DialogContentExampleDialog,
    NoDataInsertedComponent,
  InvalidAuthComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducer),
    LayoutModule,
    MatComponentModule,
    AngularFireModule.initializeApp(environment.firebase,'petpujoadmin'),
    AngularFirestoreModule.enablePersistence(), 
    AngularFireAuthModule, 
    AngularFireStorageModule
    
  ],
  providers: [UserAuthService,AuthGuard,LoginGuard,MatDatepickerModule,
    FirestoreStorageService,
    { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
