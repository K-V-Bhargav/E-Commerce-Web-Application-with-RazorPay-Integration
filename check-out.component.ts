import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

declare var Razorpay: any;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  user: any;
  response: any;
  rzp1: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const navigation = window.history.state;
    this.user = navigation.user;
    this.response = navigation.response;
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    script.onload = () => {
      this.createRazorpayInstance();
    };
  }

  createRazorpayInstance() {
    const options = {
      "key": "rzp_test_R1Iwue8Zx8XY5H",
      "amount": this.user.Amount,
      "currency": "INR",
      "name": "AmaZon",
      "description": "Test Transaction",
      "image": "data:image/png;base64,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",
      "order_id": this.response.id, 
      "prefill": {
          "name": "Bhargav K V", 
          "email": "kvbhargav174@gmail.com",
          "contact": "9963671493"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#000000"
      }
    };
    this.rzp1 = new Razorpay(options);
  }

  pay() {
    if (this.rzp1) {
      this.rzp1.open();
      const newData = {
        "Paid": true
      }
      this.http.put(`http://localhost:8000/api/update/${this.user._id}`, newData).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
    } else {
      console.error('Razorpay instance is not created');
    }
  }
}
