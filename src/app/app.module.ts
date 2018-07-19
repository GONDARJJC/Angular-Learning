import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './core/auth.service';
import { routing } from './app.routes';

import { HttpClientModule } from '@angular/common/http';
import { TodoModule } from './todo/todo.module';
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    TodoModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
