import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordFrom: any = FormGroup;
  responseMessage: any;
  constructor( private formBuilder :FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.changePasswordFrom = this.formBuilder.group({
      oldPassword :[null,[Validators.required]],
      newPassword:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]],
    })
  }

  validateSubmit(){
    if(this.changePasswordFrom.controls['newPassword'].value!=this.changePasswordFrom.controls['confirmPassword'].value){
      return true;
    }else{
      return false;
    }
  }

  handleChangePasswordSubmit() {
    this.ngxService.start();
    var formDate = this.changePasswordFrom.value;
    var data = {
     oldPassword:formDate.oldPassword,
     newPassword:formDate.newPassword,
     confirmPassword:formDate.confirmPassword
    };
    this.userService.changePassword(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        // this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'Success');

      },
      (error) => {
        console.log(error);
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.genericError
        );
      }
    );
  }



}


