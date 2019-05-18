import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from 'src/app/auth/user-auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  hide = true;
  hideNew= true;
  hideConfrm = true;
  username:string;

  @ViewChild('fr') signupForm: NgForm;

  constructor(private firebaseAuth:UserAuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.firebaseAuth.createStaffAccount(this.signupForm.value.email,this.signupForm.value.password);
    this.signupForm.reset()
  }

}
