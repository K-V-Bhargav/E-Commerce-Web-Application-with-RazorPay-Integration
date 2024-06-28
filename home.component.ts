import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class HomeComponent implements OnInit {
  
  constructor(private router: Router, private http: HttpClient) {}
  counter = 0;
  users: any[] = [];
  cartArray: any[] = [];
  ngOnInit(): void {
    this.http.get("http://localhost:8000/api/get").subscribe(
      (response: any) => {
        this.users = response.Data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  buy(user: any) {
    const newData = {
      "amount": user.Amount * 100,
      "currency": "INR",
      "receipt": "qwsaq1",
    };

    this.http.post("http://localhost:8000/api/buyOrders", newData).subscribe(
      (response: any) => {
        this.router.navigate(['/checkOut'], { state: { user, response } });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cart(user: any) {
    this.counter = this.counter + 1;
    this.cartArray.push(user);
  }

  navigate(){
    this.router.navigate(['/cart'], { state: { cartArray: this.cartArray } });
  }
}
