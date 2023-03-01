import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { routes } from './routing';
import { HttpService } from './http.service';
import { UtilityService } from './utility.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { StartPageComponent } from './start-page/start-page.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, HomeComponent, ErrorComponent, StartPageComponent, ContactComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    Ng2SearchPipeModule,
  ],
  providers: [HttpService, UtilityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
