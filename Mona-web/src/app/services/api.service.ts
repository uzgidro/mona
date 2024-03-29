import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {JwtService} from "./jwt.service";
import {Tokens} from "../models/tokens";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private jwt: JwtService) {
  }

  signUp(user: User) {
    return this.http.post(BASE_URL + AUTH + SIGN_UP, user);
  }

  signIn(user: Partial<any>): Observable<any> {
    return this.http.post(BASE_URL + AUTH + SIGN_IN, user);
  }

  refreshTokens() {
    const oldToken: Tokens = {accessToken: this.jwt.getAccessToken(), refreshToken: this.jwt.getRefreshToken()}
    this.http.post<Tokens>(BASE_URL + AUTH + REFRESH, oldToken)
      .forEach((value: Tokens) => this.jwt.saveTokens(value)).catch((err) => console.log(err))
  }

  authCheck(){
    return this.http.get(BASE_URL+USERS+LIST)
  }



}


const BASE_URL = 'http://localhost:5031'
const AUTH = '/auth'
const SIGN_UP = '/sign-up'
const SIGN_IN = '/sign-in'
const REFRESH = '/refresh'
const USERS='/users'
const LIST='/list'



