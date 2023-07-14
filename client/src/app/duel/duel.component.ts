import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { userProfile } from 'src/app/app.component';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""
  user1: userProfile = {
    username: "",
    name: "",
    location: "",
    bio: "",
    avatar_url: "",
    titles: [],
    "favorite-language": "",
    "public-repos": 0,
    "total-stars": 0,
    "highest-starred": 0,
    "perfect-repos": 0,
    followers: 0,
    following: 0
  }
  user2: userProfile = {
    username: "",
    name: "",
    location: "",
    bio: "",
    avatar_url: "",
    titles: [],
    "favorite-language": "",
    "public-repos": 0,
    "total-stars": 0,
    "highest-starred": 0,
    "perfect-repos": 0,
    followers: 0,
    following: 0
  }
  winner: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  calculateScore(user: userProfile) {
    let score = 0;
    if (user.name) score +=1;
    if (user.location) score +=1;
    score += user.titles.length;
    if (user['favorite-language']) score +=1;
    score += user['total-stars'] * 0.25;
    score += user['highest-starred'] * 0.25;
    score += user['public-repos'] * 0.1;
    score += user['perfect-repos'] * 0.1;
    score += user.followers * 0.1;
    score += user.following * 0.05;
    return score;
  }

  determineWinner(user1: userProfile, user2: userProfile) {
      let score1 = this.calculateScore(user1), score2 = this.calculateScore(user2);
      if (score1 === score2) {
        this.winner = 0;
      }
      else if (score1 < score2) {
        this.winner = 2;
      }
      else this.winner = 1;
  }

  onSubmit() {
    this.userService.duelUsers(this.usernameOne, this.usernameTwo).then((response: any) => {
      this.user1 = response[0];
      this.user2 = response[1];
      this.determineWinner(response[0], response[1]);
    });
  }

  
}
