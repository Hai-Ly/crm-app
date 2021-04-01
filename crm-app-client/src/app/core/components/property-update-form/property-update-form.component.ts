import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Property } from '../../models';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'crm-property-update-form',
  templateUrl: './property-update-form.component.html',
  styleUrls: ['./property-update-form.component.scss']
})
export class PropertyUpdateFormComponent implements OnInit {

  readonly properties:Property[]
  propertiesForm : FormGroup;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private dialogData: {props: Property[]}, private dialogRef: MatDialogRef<PropertyUpdateFormComponent>) { 
    
    let form:{[key:string]:FormControl} = {};
    this.properties = this.dialogData.props;
    // TODO: need to improve for multi data.
    dialogData.props.forEach((p:Property) => {
        form[p.name] = this.fb.control(p.value);
    });

    this.propertiesForm = this.fb.group(form);
  }

  ngOnInit() {

  }

  onCancelClicked() {
    this.dialogRef.close(undefined);
  }

  onYesClicked() {
    this.dialogRef.close(this.propertiesForm.value);
  }

  onSubmit() {
    
  }
}
