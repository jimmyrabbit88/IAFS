import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    public auth: AuthService,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  register(){
    console.log("passing to auth Signup")
    this.auth.SignUp(this.email, this.password)
  }

  goToLog(){
    this.router.navigate(['log']);
  }

}
