import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userDetails;
  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
          this.userDetails = res;
        },
      err => {
        console.log(err);
      },
    );
  }

}
