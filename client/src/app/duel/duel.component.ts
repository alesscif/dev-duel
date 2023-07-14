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
  scores: number[][] = [
    [    
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [    
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
  ]

  scores1: number[] = [];
  scores2: number[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  calculateScore(user: userProfile, userIndex: number) {  
    if (user.name != null) {
      this.scores[userIndex][0] = 1;
    }
    if (user.location != null) {
      this.scores[userIndex][1] = 1;
    }
    this.scores[userIndex][2] = user.titles.length;
    if (user['favorite-language'] !== '' || null || undefined) 
      this.scores[userIndex][3] = 1;
    this.scores[userIndex][4] = Math.floor(user['total-stars'] * 0.35);
    this.scores[userIndex][5] = Math.floor(user['highest-starred'] * 0.30);
    this.scores[userIndex][6] = Math.floor(user['public-repos'] * 0.2);
    this.scores[userIndex][7] = Math.floor(user['perfect-repos'] * 0.1);
    this.scores[userIndex][8] = Math.floor(user.followers * 0.04);
    this.scores[userIndex][9] = Math.floor(user.following * 0.02);
  }

  determineWinner(user1: userProfile, user2: userProfile) {
    for (let arr of this.scores) {
      arr.fill(0);
    }
      this.calculateScore(user1, 0);
      this.calculateScore(user2, 1);
      
      let score1 = this.scores[0].reduce((total, current) => total + current, 0)
      let score2 = this.scores[1].reduce((total, current) => total + current, 0);

      if (score1 === score2) {
        this.winner = 0;
      }
      else if (score1 < score2) {
        this.winner = 2;
      }
      else this.winner = 1;

    this.scores1 = this.scores[0];
    this.scores2 = this.scores[1];
  }
  
  error: string = "";
  ok: boolean = false;

  onSubmit() {
    this.userService.duelUsers(this.usernameOne, this.usernameTwo).then((response: any) => {
      if (!response[0].username || !response[1].username) {
        this.ok = false;
        this.error = response;
      }
      else {
        this.ok = true;      
        this.user1 = response[0];
        this.user2 = response[1];
        this.determineWinner(response[0], response[1]);
      }
    });
  }

  
}
