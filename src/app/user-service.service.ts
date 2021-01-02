import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { UserDetails } from './user-details'; 

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = 'https://localhost:44355/Api/User';   
  constructor(private http: HttpClient) { }  
  getAllUser(): Observable<UserDetails[]> {  
    return this.http.get<UserDetails[]>(this.url + '/AllUserDetails');  
  }  
  getUserById(userId: string): Observable<UserDetails> {  
    return this.http.get<UserDetails>(this.url + '/GetUserByID/' + userId);  
  }  
  createUser(user: UserDetails): Observable<UserDetails> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<UserDetails>(this.url + '/InsertUserDetails/',  
    user, httpOptions);  
  }  
  updateEmployee(user: UserDetails): Observable<UserDetails> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<UserDetails>(this.url + '/UpdateUserDetails/',  
    user, httpOptions);  
  }  
  deleteUserById(userId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteUserDetails?id=' +userId,  
 httpOptions);  
  }
}
