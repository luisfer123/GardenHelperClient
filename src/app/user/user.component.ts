import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/User';
import { AuthService } from '../_security/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User | null = null;
  userId: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    if(this.authService.principalValue?.id) {
      this.userId = this.authService.principalValue.id;
    } else {
      // If principal id is null, logout and redirecto to login page
      // set userId = 0 just to make code compile. Anyway will logout the user.
      this.userId = 0;
      this.authService.logout().subscribe({
        next: _ => {
          router.navigate(['login']);
        }
      });
    }
   }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe({
      next: user => {
        console.log(user);
        this.user = user;
      }
    });
  }

}
