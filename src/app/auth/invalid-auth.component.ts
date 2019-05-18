import { Component } from '@angular/core';

@Component({
    selector: 'snack-bar-auth',
    templateUrl: './snack-bar-component-example-snack.html',
  })
  export class InvalidAuthComponent {
  }


  @Component({
    selector: 'snack-bar-auth-sucess',
    templateUrl: './snackbar-success.html',
  })
  export class ChangePasswordSuccessComponent {
  }


  @Component({
    selector: 'snack-bar-auth-fail',
    templateUrl: './snackbar-failed.html',
  })
  export class ChangePasswordFailedComponent {
  }


  @Component({
    selector: 'snack-bar-auth-creat',
    templateUrl: './sanckbar-user-created.html',
  })
  export class UserCreatedComponent {
  }