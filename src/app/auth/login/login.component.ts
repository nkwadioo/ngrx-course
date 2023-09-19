import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import { AppState } from '../../reducers';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router
      private store: Store<AppState>
      ) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    this.auth.login(this.form.value.email, this.form.value.password).pipe(
      tap(user =>{
         console.log(user);
         this.store.dispatch({
          type: 'Login Action', // an event in a component || a command to the store
          payload: { // any data the store might need to create a new version of its internal state
            userProfile: user
          }
         })
         this.router.navigateByUrl('/courses')
      })
    ).subscribe({
      error: () => [
        alert('Login Failed')
      ]
    })
  }

}

