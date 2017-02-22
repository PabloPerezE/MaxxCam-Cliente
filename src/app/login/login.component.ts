import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  forgot(){
  let link = ['/forgot'];
    this.router.navigate(link);
}

register(){
  let link = ['/register'];
    this.router.navigate(link);
}

}
