import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { finalize } from 'rxjs/operators';
import { UtilityService } from '../utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm = new FormGroup({
    userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12),
    ]),
    email: new FormControl('', [
      Validators.required,
  ]),
    password: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
    ]),
});



signup() {
  const sub = this.http.post<any>('signup', this.signupForm.value).pipe(finalize(() => {
      if (sub?.unsubscribe) {
          sub.unsubscribe();
      }
  })).subscribe(data => {
      this.router.navigate(['/login']);
  });
}

constructor(private http: HttpService, private router: Router, private utility: UtilityService) { }

ngOnInit() {
  if (this.utility.getUser()) {
      this.router.navigate(['']);
  }
}

}

