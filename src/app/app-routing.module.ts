import { Routes, RouterModule } from '@angular/router';
import { SelectResturantComponent } from './resturant/select-resturant/select-resturant.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { NgModule } from '@angular/core';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginGuard } from './auth/login-guard.service';
import { TransactionHistoryComponent } from './transaction/transaction-history/transaction-history.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { CreateAccountComponent } from './admin-profile/create-account/create-account.component';


const appRoutes: Routes = [
    
    {path:'login', component:SigninComponent, canActivate:[LoginGuard]},
    {path:'', redirectTo: 'main', pathMatch: 'full'},
    {path:"main", component:MainPagesComponent,
    canActivate:[AuthGuard],
    children:[
        {path: '', redirectTo:'place', pathMatch: 'full'},
        {path:"place", component: SelectResturantComponent},
        {path:'menu/:id', component: MenuItemComponent},
        {path:'sales', component: SalesReportComponent},
        {path:'transaction',component: TransactionHistoryComponent},
        {path:'admin', component: AdminProfileComponent }
    ]},
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}