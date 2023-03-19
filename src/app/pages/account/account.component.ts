import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  delete() {
    let ans = confirm('are you sure?');
    if (ans) {
      this.authService.deleteUser();
    }
  }
}
