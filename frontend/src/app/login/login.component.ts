import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { finalize } from 'rxjs/operators';
import { UtilityService } from '../utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12),
    ]),
    password: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
    ]),
});

errorMessage?:string

login() {
  this.errorMessage = '';

  const sub = this.http.post<any>('login', this.loginForm.value).pipe(finalize(() => {
      if (sub?.unsubscribe) {
          sub.unsubscribe();
      }
  })).subscribe(data => {
      if (data.status == 'error') {
          this.errorMessage = "something went wrong";
      } else {
          this.utility.setUser(data.user);
          this.router.navigate(['home']);
      }
  });
}

constructor(private http: HttpService, private utility: UtilityService, private router: Router) { }

ngOnInit() {
    if (this.utility.getUser()) {
        this.router.navigate(['home']);
    }
}

}

