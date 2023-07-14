import { Component } from '@angular/core';
import { UserService } from '../user.service';

export interface userProfile {
  username: string;
  name: string;
  location: string;
  bio: string;
  avatar_url: string;
  titles: string[];
  "favorite-language": string;
  "public-repos": number;
  "total-stars": number;
  "highest-starred": number;
  "perfect-repos": number;
  followers: number;
  following: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dev-duel';

  constructor(private userService: UserService) { }

  async inspectUser(username: string= 'andrew') {
    const data = await this.userService.inspectUser(username);
    console.log(data);
  }

  async duelUsers(user1: string, user2: string) {
    const data = await this.userService.duelUsers(user1, user2);
    console.log(data);
  }

}
