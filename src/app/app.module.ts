import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './core/auth.service';
import { routing } from './app.routes';
import { TodoComponent } from './todo/todo.component';

import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo/todo.service';
@NgModule({
  declarations: [AppComponent, LoginComponent, TodoComponent],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
