import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_model/User';
import { AuthService } from '../../_security/auth.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User | null = null;
  userId: number = -1;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { 
    if(this.authService.principalValue && this.authService.principalValue.id) {
      this.userId = this.authService.principalValue.id;
    } else {
      this.authService.logout().subscribe({
        next: _ => {
          this.router.navigate(['login']);
        }
      });
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getUser(this.userId).subscribe({
      next: user => this.user = user
    });
  }

}
