import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  @ViewChild('pass') pass!: ElementRef<any>;
  form!: FormGroup;
  showPassword: boolean = false;

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
          ),
        ],
        [this.asyncCheckEmail],
      ],
      password: ['', this.checkPassword],
    });
  }

  login() {
    this.authService
      .login(this.email.value, this.password.value)
      .subscribe((check) => {
        if (!check) {
          alert('Wrong creditianls! Try agian ...');
          this.email.setValue('');
          this.password.setValue('');
        } else {
          this.router.navigate(['']);
        }
      });
  }

  private asyncCheckEmail = (
    control: AbstractControl
  ): Observable<ValidationErrors> | null => {
    return this.authService.checkEmail(control.value).pipe(
      map((val) => {
        if (val) {
          return {
            valid: true,
          };
        } else {
          return {
            valid: false,
          };
        }
      })
    );
  };

  private checkPassword(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.length >= 8) {
      return {
        valid: true,
      };
    }

    return {};
  }

  showPass() {
    if (this.pass.nativeElement.type === 'password') {
      this.pass.nativeElement.type = 'text';
      this.showPassword = true;
    } else {
      this.showPassword = false;
      this.pass.nativeElement.type = 'password';
    }
  }
}
