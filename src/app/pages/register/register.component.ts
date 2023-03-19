import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('pass') pass!: ElementRef<any>;
  @ViewChild('conf') conf!: ElementRef<any>;
  form!: FormGroup;
  pwdNotMatch = 'pwdNotMatch';
  showPassword: boolean = false;

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get pwd(): FormGroup {
    return this.form.get('pwd') as FormGroup;
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [this.checkEmail], [this.asyncCheckEmail]],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
          ),
        ],
      ],
      pwd: this.fb.group(
        {
          password: ['', [this.checkPassword(8)]],
          confirm: [''],
        },
        {
          validators: [this.matchPwd],
        }
      ),
    });
  }

  signup() {
    const user = {
      username: this.username.value,
      email: this.email.value,
      password: this.pwd.get('password')?.value,
    };

    this.authService.signup(user);
  }

  private asyncCheckEmail = (
    control: AbstractControl
  ): Observable<ValidationErrors> | null => {
    return this.authService.checkEmail(control.value).pipe(
      map((val) => {
        if (val) {
          return {
            hasemail: true,
          };
        } else {
          return {
            hasemail: false,
          };
        }
      })
    );
  };

  private checkEmail(control: AbstractControl): ValidationErrors | null {
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (regex.test(control.value)) {
      return {
        valid: true,
      };
    }
    return {
      valid: false,
    };
  }

  private checkPassword(limitednum: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

      if (!regex.test(control.value)) {
        return {
          valid: true,
          requiredLength: limitednum,
        };
      }
      return null;
    };
  }

  private matchPwd = (group: FormGroup): ValidationErrors | null => {
    const pwdval = group.get('password')?.value;
    const cfmval = group.get('confirm')?.value;

    if (pwdval !== cfmval) {
      return { [this.pwdNotMatch]: true };
    }
    return null;
  };

  showPass() {
    if (this.pass.nativeElement.type === 'password') {
      this.pass.nativeElement.type = 'text';
      this.conf.nativeElement.type = 'text';
      this.showPassword = true;
    } else {
      this.showPassword = false;
      this.pass.nativeElement.type = 'password';
      this.conf.nativeElement.type = 'password';
    }
  }
}
