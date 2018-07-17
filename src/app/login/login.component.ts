import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <form 
      (ngSubmit)="onSubmit(formRef.value)"
      #formRef="ngForm">
      <fieldset ngModelGroup="login">
        <input required
        name='name'
        minlength="3"
        #usernameRef="ngModel" 
        [(ngModel)]="username" type="text">
        {{ usernameRef.errors | json }}
        <div *ngIf="usernameRef.errors?.required">this is required</div>
        <div *ngIf="usernameRef.errors?.minlength">should be at least 3 charactors</div>
        <input required
        name='psd'
        #passwordRef="ngModel" 
        [(ngModel)]="password" 
        type="password">
        {{passwordRef.valid}}
        <button type="submit">Login</button>
      </fieldset>
      </form>
    </div>
  `,
  styles: [`
  .ng-invalid{
    border: 3px solid red;
  }
  .ng-valid{
    border: 3px solid green;
  }
  `]
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(private service: AuthService) { }

  ngOnInit() {
  }
  
  onSubmit(formValue) {
    console.log(formValue);
    console.log(formValue.login.name, formValue.login.psd);
    console.log('auth result is: ' + this.service.loginWithCredentials(formValue.login.username, formValue.login.password));
  }
}
