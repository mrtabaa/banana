import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './models/user.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userRes: User | undefined; // default
  // private userResPrivate: string | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  //#region Create Form Group/controler (AbstractControl)
  userFg = this.fb.group({ // formGroup
    nameCtrl: ['', [Validators.minLength(3), Validators.maxLength(20)]], // formControl
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    ageCtrl: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
    isAdminCtrl: [false]
  });
  //#endregion

  //#region Methods
  registerUser(): void {
    console.log(this.userFg.value);

    let user: User = {
      name: this.NameCtrl.value,
      email: this.EmailCtrl.value,
      password: this.PasswordCtrl.value,
      age: this.AgeCtrl.value,
      isAdmin: this.IsAdminCtrl.value
    }

    this.http.post<User>('http://localhost:5000/api/user/register', user).subscribe(
      {next: res => {
        this.userRes = res; 
        console.log(res);
      }}
    );
  }
  //#endregion

  //#region Forms Properties
  // Lab's Info
  get NameCtrl(): FormControl {
    return this.userFg.get('nameCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.userFg.get('emailCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.userFg.get('passwordCtrl') as FormControl;
  }
  get AgeCtrl(): FormControl {
    return this.userFg.get('ageCtrl') as FormControl;
  }
  get IsAdminCtrl(): FormControl {
    return this.userFg.get('isAdminCtrl') as FormControl;
  }
  //#endregion

  abstractOutput() {
    console.log(this.EmailCtrl);
  }
}
