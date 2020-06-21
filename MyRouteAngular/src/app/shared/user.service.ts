import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private timerRefreshTocken;
  constructor(private fb:FormBuilder,private http:HttpClient,private router: Router) { }
  
  readonly BaseURI='http://localhost:6405/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/LoginTraveler', formData);
  }
  setRefreshTimeToken(){
    if(this.timerRefreshTocken){
      clearInterval(this.timerRefreshTocken);
    }
    this.timerRefreshTocken=setInterval(()=> {
      this.refreshToken(localStorage.getItem('accessToken'),localStorage.getItem('refreshToken')).subscribe(
        (res: any) => {
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('accessToken', res.accessToken.token);
            // this.router.navigateByUrl('/home');
            console.log("Token refreshed");
            
          },
          err => {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            this.router.navigateByUrl('/user/login');
          }
        )
    },60000);

  }
  refreshToken(accessToken,refreshToken){
    return this.http.post(this.BaseURI + '/ApplicationUser/RefreshToken',{accessToken:accessToken,refreshToken:refreshToken});
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('accessToken').split('.')[1]));//из токена беру нагрузку и распарсить
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
