import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  logged: boolean = false;
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }

  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.logged = false;
  }
}
