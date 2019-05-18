import { NgModule } from '@angular/core';

import {MatButtonModule, 
    MatCheckboxModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule, 
    MatCardModule, 
    MatGridListModule , 
    MatChipsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule, 
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    MatSnackBarModule,
    MatNativeDateModule} from '@angular/material';

@NgModule({
    imports:[
        MatButtonModule, 
        MatCheckboxModule,
        MatToolbarModule, 
        MatIconModule, 
        MatSidenavModule,
        MatListModule,
        MatFormFieldModule,
        MatCardModule,
        MatChipsModule,
        MatSortModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatInputModule,
        MatTabsModule,
        MatGridListModule,
        MatSnackBarModule,
        MatMenuModule
    ],
    exports:[
        MatButtonModule, 
        MatCheckboxModule,
        MatToolbarModule, 
        MatIconModule, 
        MatSidenavModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSortModule,
        MatTabsModule,
        MatFormFieldModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatTableModule,
        MatInputModule,
        MatGridListModule,
        MatSnackBarModule,
        MatMenuModule
    ]
})
export class  MatComponentModule{

}