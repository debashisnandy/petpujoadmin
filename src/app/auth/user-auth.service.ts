import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { InvalidAuthComponent, ChangePasswordSuccessComponent, ChangePasswordFailedComponent, UserCreatedComponent } from './invalid-auth.component';
import { MatSnackBar } from '@angular/material';



@Injectable()
export class UserAuthService {

  durationInSeconds = 5;
  
  subject = new Subject<string>();

  private token= null;

    constructor(private firebaseAuth: AngularFireAuth,
      private router:Router,private snackBar: MatSnackBar){}

    createStaffAccount(email: string, password: string){
      this.firebaseAuth.auth.createUserWithEmailAndPassword(email,password).then(
        () =>{
          this.snackBar.openFromComponent(UserCreatedComponent, {
            duration: this.durationInSeconds * 1000,
          });
        }
      ).catch(
        ()=>{
          this.snackBar.openFromComponent(ChangePasswordFailedComponent, {
            duration: this.durationInSeconds * 1000,
          });
        }
      );
    }

    login(email: string, password: string) {
        this.firebaseAuth
          .auth
          .signInWithEmailAndPassword(email, password)
          .then(value => {
            this.token = value.user.getIdToken();
            this.router.navigate(['/']);
            
          })
          .catch(err => {
            this.snackBar.openFromComponent(InvalidAuthComponent, {
              duration: this.durationInSeconds * 1000,
            });
          });
      }
    
      chnagePassword(oldPassword:string,newPassWord:string){

        let credential = auth.EmailAuthProvider.credential('debashisnandy99@gmail.com',oldPassword);

        this.firebaseAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential).then(
          () =>{
            this.firebaseAuth.auth.currentUser.updatePassword(newPassWord).then(
              ()=>{
                this.snackBar.openFromComponent(ChangePasswordSuccessComponent, {
                  duration: this.durationInSeconds * 1000,
                });
              }
            ).catch(
              ()=>{
                this.snackBar.openFromComponent(ChangePasswordFailedComponent, {
                  duration: this.durationInSeconds * 1000,
                });
              }
            );
          }
        ).catch(
          ()=>{
            this.snackBar.openFromComponent(InvalidAuthComponent, {
              duration: this.durationInSeconds * 1000,
            });
          }
        );
      }

      logout() {
        this.router.navigate(['/login']);
        this.firebaseAuth
          .auth
          .signOut();
      }


      getUserName(){
        return this.firebaseAuth.auth.currentUser.email;
      }
      
}