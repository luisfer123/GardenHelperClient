import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bonsai } from '../_model/Bonsai';
import { BonsaiPage } from '../_model/BonsaiPage';
import { AuthService } from '../_security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BonsaiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  getBonsaisPage(userId: number | null, pageNum: number, pageSize: number, sortBy: string): Observable<BonsaiPage> {
    if(userId == null) {
      this.authService.logout().subscribe({
        next: _ => this.router.navigate(['login'])
      });
      return of(new BonsaiPage);
    } else {
      return this.http.get<BonsaiPage>(environment.restUrl + '/api/v1/plants/bonsais/', 
        {params: {user_id: userId, pageNum: pageNum, pageSize: pageSize, sortBy: sortBy}, 
        withCredentials: true}).pipe(map(data => {
          return BonsaiPage.fromData(data);
        }));
    }
  } 
  
}
