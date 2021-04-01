import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Confirm } from '../../models';

@Component({
  selector: 'crm-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  confirm : Confirm;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any, private dialogRef: MatDialogRef<ConfirmComponent>) { 
    this.confirm = this.dialogData.confirm
  }

  ngOnInit() : void {

  }

  onCancelClicked() {
    this.dialogRef.close(false);
  }

  onYesClicked() {
    this.dialogRef.close(true);
  }

}
