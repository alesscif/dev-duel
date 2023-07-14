import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const inspectUserUrl = 'http://localhost:3000/api/user/';
const duelUsersUrl = 'http://localhost:3000/api/users?';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  async inspectUser(username = 'andrew') {
    let data;
    try {
      data = await this.http.get(inspectUserUrl + username).toPromise()
    } catch (e: any) {
      data = e.message;
    }
    console.log(data);
    return data;
  }

  async duelUsers(user1 = 'fabpot', user2 = 'andrew') {
    let data;
    try {
      data = await this.http.get(duelUsersUrl + `username=${user1}&username=${user2}`).toPromise();
    } catch (e: any) {
      data = e.message;
    }
    console.log(data);
    return data;
  }

}
