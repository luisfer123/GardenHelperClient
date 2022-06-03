import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_model/User';

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
  
}
