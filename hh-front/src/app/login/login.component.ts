import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logged: boolean = false;
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}


  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }

  }

  login() {
    this.authService.login(this.username, this.password).subscribe((data) => {
      localStorage.setItem('token', data.access);
      localStorage.setItem('username', this.username);   
      this.logged = true;
      console.log(this.username)
    });
  }
}