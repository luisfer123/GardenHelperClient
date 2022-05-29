import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Principal } from './Principal';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  principalSubject: BehaviorSubject<Principal | null>;
  principal: Observable<Principal | null>; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedPrincipalStr = localStorage.getItem('principal');
    if(storedPrincipalStr) {
      const principal: Principal = 
        Principal.fromData(JSON.parse(storedPrincipalStr));
      this.principalSubject = new BehaviorSubject<Principal | null>(principal);
    } else {
      this.principalSubject = new BehaviorSubject<Principal | null>(null);
    }

    this.principal = this.principalSubject.asObservable();
  }

  public get principalValue(): Principal | null {
    return this.principalSubject.value;
  }

  login(username: string, password: string): Observable<Principal> {
    return this.http.post<Principal>(environment.restUrl + 'api/v1/login', {username: username, password: password}, {withCredentials: true})
      .pipe(map(data => {
        const recivedPrincipal = Principal.fromData(data);
        localStorage.setItem('principal', JSON.stringify(recivedPrincipal));
        this.principalSubject.next(recivedPrincipal);
        return recivedPrincipal;
      }));
  }

}
