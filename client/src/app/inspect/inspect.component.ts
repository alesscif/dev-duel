import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { userProfile } from 'src/app/app.component';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {
  username: string = "" 
  user: userProfile = {
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  error: string = "";
  ok: boolean = false;

  onSubmit() {
      this.userService.inspectUser(this.username).then((response: any) => { 
        if (!response.username) {
          this.ok = false;
          this.error = response;
          console.log(response + "hihih");
        }
        else {
          this.ok = true;
          this.user = response;
        }
      })
  }

}
