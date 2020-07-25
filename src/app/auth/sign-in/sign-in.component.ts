import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    public auth: AuthService,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  login(){
    console.log('passing to auth signin')
    this.auth.SignIn(this.email, this.password)
  }

  goToReg(){
    this.router.navigate(['register']);
  }


}
