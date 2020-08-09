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
  confirmPassword: string;
  passwordMatch: number = 0;

  constructor(
    public auth: AuthService,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  register(){
    console.log("passing to auth Signup")
    this.passwordMatch = this.checkPasswords();
    if(this.passwordMatch == 1){
      this.auth.SignUp(this.email, this.password);
    }
  }

  checkPasswords(): number{
    if(this.password.length <= 6){
      return 2;
    }
    else if(this.password === this.confirmPassword){
      return 1;
    }
    else{
      return 3;
    }

  }

  goToLog(){
    this.router.navigate(['log']);
  }

}
