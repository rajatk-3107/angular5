import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute } from "@angular/router";
// import { Http, Headers } from "@angular/http";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  header;
  loginform = {
    email: '',
    password: ''
  };
  constructor(
    private router: Router, 
    // private ar: ActivatedRoute, 
    private login: LoginService, 
    private http: HttpClient) {
    }

  ngOnInit() {
    if(localStorage.getItem('token') && this.login.isLogin){
      this.router.navigate(['/home'])
    }
  }
  logins() {
    // start loader service
    console.log(this.loginform)
    this.http.post('http://localhost:4000/login', this.loginform).subscribe((data: any) => {
      // stop loader service here
      this.router.navigate(['/home']);
      localStorage.setItem('token', data.token);
      this.login.isLogin = true;
      console.log(data);
      console.log('Api call completed');
    });
  }

}
