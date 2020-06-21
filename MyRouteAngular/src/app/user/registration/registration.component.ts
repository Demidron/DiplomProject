import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../user.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService,private toastr:ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.success) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } 
      },
      err => {
        this.toastr.error(err.error.errors);
      }
    );
  }
}
