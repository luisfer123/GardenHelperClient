import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_model/User';
import { EditUser } from 'src/app/_payloads/edit-user';
import { AuthService } from 'src/app/_security/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User | null = null;
  userId: number = -1;
  userEdited: EditUser = new EditUser();

  personalInfForm: FormGroup;
  changePasswordFrom: FormGroup;
  userInfoForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {

    this.personalInfForm = new FormGroup({
      'firstName': new FormControl(null),
      'middleName': new FormControl(null),
      'lastName': new FormControl(null),
      'secondLastName': new FormControl(null),
    });

    this.userInfoForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });

    this.changePasswordFrom = new FormGroup({
      'currentPassword': new FormControl(null),
      'newPassword': new FormControl(null),
      'repeatNewPassword': new FormControl(null)
    });
    
    const tempId = this.authService.principalValue?.id;
    if(tempId) {
      this.userId = tempId;
    } else {
      this.authService.logout().subscribe({
        next: _ => {
          router.navigate(['login']);
        }
      });
    }
   }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.getUser(this.userId).subscribe({
      next: data => {
        this.user = User.fromData(data);
        this.populateForms();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onSubmitUserinfoForm() {
    this.userService.updateUserInfo(this.userInfoForm.value, this.userId).subscribe({
      next: _ => {
        this.authService.logout().subscribe({
          next: _ => {
            this.router.navigate(['login']);
          }
        });
      },
      error: err => {
        console.log(err.error);
      }
    });
  }

  onSubmitPersonaInfoForm() {
    this.userService.updatePersonalInfo(this.personalInfForm.value, this.userId).subscribe({
      next: user => {
        // Since Roles are not updated here, we can just take them from Principal object.
        if(this.authService.principalValue) {
          user.roles = this.authService.principalValue.roles;
        }
        this.user = user;
      },
      error: err => {
        console.log(err);
      }
    });
  }
  
  onSubmitChangePasswordForm() {
    this.userService.updatePassword(this.changePasswordFrom.value, this.userId).subscribe({
      next: _ => {
        this.authService.logout().subscribe({
          next: _ => {
            this.router.navigate(['login']);
          }
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  populateForms() {
    this.personalInfForm.patchValue({
      'firstName': this.user?.firstName,
      'middleName': this.user?.middleName,
      'lastName': this.user?.lastName,
      'secondLastName': this.user?.secondLastName,
    });

    this.userInfoForm.patchValue({
      'username': this.user?.username,
      'email': this.user?.email
    });
  }

}
