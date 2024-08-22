import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryFrom: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.categoryFrom = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.categoryFrom.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    const formData = this.categoryFrom.value;
    const data = {
      name: formData.name,
    };
    this.categoryService.add(data).subscribe(
      (rep: any) => {
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage = rep.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'Success');
      },
      (error: any) => {
        this.dialogRef.close();
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

  edit() {
    const formData = this.categoryFrom.value;
    const data = {
      id: this.dialogData.data.id,
      name: formData.name,
    };
    this.categoryService.update(data).subscribe(
      (rep: any) => {
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMessage = rep.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'Success');
      },
      (error: any) => {
        this.dialogRef.close();
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
