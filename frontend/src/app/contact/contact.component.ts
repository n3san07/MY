import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { UtilityService } from '../utility.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {





  constructor( public router: Router) { }


}