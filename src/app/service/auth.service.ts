import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl = 'http://localhost:3000/';
  userEndpoint = this.apiBaseUrl + "user";
  roleEndpoint = this.apiBaseUrl + "role";

  constructor(private httpClient: HttpClient) { }

  GetAllUsers(){
    return this.httpClient.get(this.userEndpoint)
  }

  GetUserByCode(code: any){
    return this.httpClient.get(this.userEndpoint + '/' + code)
  }

  RegisterUser(inputData: any){
    return this.httpClient.post(this.userEndpoint, inputData)
  }

  UpdateUser(code: any, inputData: any){
    return this.httpClient.put(this.userEndpoint + '/' + code, inputData)
  }

  IsLoggedIn(){
    return sessionStorage.getItem("username") !== null;
  }

  GetUserRole(){
    const role = sessionStorage.getItem("role");
    return role !== null ? role.toString() : "";
  }

  GetAllRoles(){
    return this.httpClient.get(this.roleEndpoint)
  }

}
