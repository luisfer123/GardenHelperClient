import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_model/User';
import { UpdateUserPersonalInfo } from '../_payloads/update-user-personal-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(environment.restUrl + '/api/v1/users/' + userId, {withCredentials: true})
      .pipe(map(data => User.fromData(data)));
  }

  updatePersonalInfo(data: UpdateUserPersonalInfo, userId: number): Observable<User> {
    return this.http.put<User>(environment.restUrl + '/api/v1/users/' + userId + '/personalInfo', data, {withCredentials: true})
      .pipe(map(data => User.fromData(data)));
  }

  updateUserInfo(data: {username: string, email: string}, userId: number): Observable<any> {
    return this.http.put<any>(environment.restUrl + '/api/v1/users/' + userId + '/userInfo', data, {withCredentials: true});
  }

  updatePassword(data: {currentPassword: string, newPassword: string, repeatNewPassword: string}, userId: number): Observable<boolean> {
    return this.http.put<boolean>(environment.restUrl + '/api/v1/users/' + userId + '/userPassword', data, {withCredentials: true});
  }
  
}
