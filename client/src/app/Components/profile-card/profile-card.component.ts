import { Component, Input, OnInit } from '@angular/core';
import { userProfile } from 'src/app/app.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() user: userProfile = {
    username: '',
    name: '',
    location: '',
    bio: '',
    avatar_url: '',
    titles: [],
    'favorite-language': '',
    'public-repos': 0,
    'total-stars': 0,
    'highest-starred': 0,
    'perfect-repos': 0,
    followers: 0,
    following: 0
  }; 

  @Input() scores: number[] = [    
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

  @Input() score: number = 0;

  @Input() winner: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  
}
