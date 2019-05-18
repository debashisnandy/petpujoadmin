import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../auth/user-auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  hide = true;
  hideNew= true;
  hideConfrm = true;
  username:string;

  @ViewChild('fr') signupForm: NgForm;

  constructor(private firebaseUser:UserAuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.firebaseUser.chnagePassword(this.signupForm.value.password,this.signupForm.value.newpassword);
  }
}
