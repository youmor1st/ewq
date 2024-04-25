import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  signUp(): void {
    if (!this.username || !this.password) {
      console.error('Username and password are required');
      return;
    }

    const userData = { username: this.username, password: this.password };
    this.registerUser(userData).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        // В этом месте можно добавить дополнительную логику, например, перенаправление на другую страницу
      },
      (error) => {
        console.error('Error occurred during registration:', error);
        // В этом месте можно добавить обработку ошибок и вывод сообщения пользователю
      }
    );
  }

  registerUser(userData: any): Observable<any> {
    const registerUrl = 'http://127.0.0.1:8000/api/register/'; // Замените на URL вашего эндпоинта регистрации пользователя
    return this.http.post(registerUrl, userData);
  }
}
