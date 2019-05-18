import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from '../auth/user-auth.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide = true;

  @ViewChild('f') signupForm: NgForm;

  constructor(private userAuthService:UserAuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.userAuthService.login(this.signupForm.value.email,this.signupForm.value.password);
    
  }



}
