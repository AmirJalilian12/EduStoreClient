import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress, IMedProfile, IUser, Login, Register } from '../shared/Models/user';
import { HttpClient } from '@angular/common/http';
import { json } from 'node:stream/consumers';
import { Router } from '@angular/router';
import { IShippToAddress } from '../shared/Models/address';

@Injectable({
  providedIn: 'root'
})
export class AcountService {
  private baseUrl = environment.backendUrl;
  private currentUser = new BehaviorSubject<IUser>(null);
  public currentUser$ = this.currentUser.asObservable();
  constructor(private http : HttpClient , private router : Router) { }

  login(login : Login): Observable<IUser>{
    return this.http.post<IUser>(`${this.baseUrl}/account/login`,login).pipe(
      map((response)=>{
        if(response){
          this.setCurrentUser(response);
          return response;
        }
        return null;
      })
    );
  }
  Register(register : Register){
    return this.http.post(`${this.baseUrl}/account/register`,register).pipe(
      map((response:IUser)=>{
        if(response){
          this.setCurrentUser(response);
          return response;
        }
        return null;
      })
    )
  }
  logout(){
    localStorage.removeItem(environment.keySaveUser);
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }
  setCurrentUser(user : IUser){
    if(user){
      localStorage.setItem(environment.keySaveUser,JSON.stringify(user));
      this.currentUser.next(user);
    }
  }
  getAddresses(){
    return this.http.get<IAddress[]>(`${this.baseUrl}/account/getAddresses`);
  }
  addAddress(address : IShippToAddress): Observable<IAddress>{
    return this.http.post<IAddress>(`${this.baseUrl}/account/createAddress`,address);
  }
  getMedProfile(): Observable<IMedProfile> {

    return this.http.get<IMedProfile>(
      `${this.baseUrl}/account/GetMedProfile`
    );
  }
}
