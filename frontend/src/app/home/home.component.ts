import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { HttpService } from '../http.service';
import { UtilityService } from '../utility.service';
import { customersData } from './data.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { User } from '../signup/user.interface';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  allData: any = [];
  editData: any = [];
  deletedData: customersData[] = [];
  createdby: any;
  show: boolean = false;
  displayMode: 'cards' | 'list' | 'trashBin' = 'list';

  myFunction() {
    this.show = !this.show;
  }
  term: any;
  today = new Date();

  addNewForm = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
    ]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    country: new FormControl('', [Validators.maxLength(20)]),
    state: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    street: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    houseNumber: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    Zip: new FormControl('', [Validators.maxLength(20)]),
    gender: new FormControl('', [Validators.required]),
    info: new FormControl('', []),
    createdby: new FormControl(''),
  });

  editform = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.maxLength(50), Validators.required]),
    city: new FormControl('', [Validators.maxLength(20), Validators.required]),
    phone: new FormControl('', [Validators.maxLength(20), Validators.required]),
    country: new FormControl('', [Validators.maxLength(20)]),
    state: new FormControl('', [Validators.maxLength(20)]),
    street: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    houseNumber: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    Zip: new FormControl('', [Validators.maxLength(20)]),
    gender: new FormControl('', []),
    info: new FormControl('', []),
  });

  //// for next week update
  opedEdit(data: any) {
    let element: HTMLElement = document.getElementById(
      'editModalBtn'
    ) as HTMLElement;
    element.click();
    this.editData = data;
  }
  edit() {
    let finelData = { id: this.editData.id, ...this.editform.value };

    const sub = this.http
      .post<customersData[]>(`editCustomer/edit`, finelData)
      .subscribe(() => {
        const sub2 = this.http
          .get<customersData[]>('customers')
          .subscribe((data) => {
            this.allData = data;
            sub2.unsubscribe();
          });
        sub.unsubscribe();
      });

    let element: HTMLElement = document.getElementById(
      'editModalBtn'
    ) as HTMLElement;
    element.click();
  }

  addNew() {
    this.addNewForm.value.createdby = this.utility.getUser()?.userName;
    console.log(this.addNewForm.value);
    const sub = this.http
      .post<customersData[]>(`customer/add`, this.addNewForm.value)
      .subscribe((x) => {
        this.allData.push(x);

        sub.unsubscribe();
      });
    let element: HTMLElement = document.getElementById(
      'closeModelBtn'
    ) as HTMLElement;
    element.click();

    this.myFunction();
  }
  Delete(data: any) {
    if (confirm('Are you sure to delete?')) {
      const sub = this.http
        .delete<void>(`DeletCustomer/${data.id}`)
        .subscribe(() => {
          sub.unsubscribe();
          this.allData.splice(this.allData.indexOf(data), 1);
          this.deletedData.push(data);
        });
    }
  }
  Drop(data:any){
    if (confirm('Are you sure to delete?')) {
      const sub = this.http
        .delete<void>(`Drop/${data.id}`)
        .subscribe(() => {
          sub.unsubscribe();
        });
        this.deletedData.splice(this.deletedData.indexOf(data), 1);
    }
  }
  ToTrashBin() {
    this.displayMode = 'trashBin';
  }
  backTOlist() {
    this.displayMode = 'list';
  }
  Restore(data: any) {
    if (confirm('Are you sure to restore?')) {
      const sub = this.http
        .get<customersData[]>(`Restore/${data.id}`)
        .subscribe(() => {
          this.deletedData.splice(this.deletedData.indexOf(data), 1);
          this.allData.push(data);
          sub.unsubscribe();
        });
    }
  }

  logout() {
    const sub = this.http
      .get('logout')
      .pipe(
        finalize(() => {
          if (sub?.unsubscribe) {
            sub.unsubscribe();
          }
        })
      )
      .subscribe(() => {
        this.utility.setUser();
        this.router.navigate(['']);
      });
  }



  ///still working on  this function
  givePermissions(user: any){
let sub = this.http.post<string>(`givePermissions`, user).subscribe((x) => {
  sub.unsubscribe();
})

  }

  constructor(
    public utility: UtilityService,
    public http: HttpService,
    public router: Router
  ) {}

  ngOnInit() {
    const sub = this.http
      .get<customersData[]>('customers')
      .subscribe((data) => {
        this.allData = data;
        sub.unsubscribe();
      });
    const sub2 = this.http
      .get<customersData[]>('getIsDeleted')
      .subscribe((trash) => {
        this.deletedData = trash;
        sub2.unsubscribe();
      });
      
  }
}
