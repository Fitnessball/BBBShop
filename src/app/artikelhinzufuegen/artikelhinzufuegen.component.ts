import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@Component({
  selector: 'app-artikelhinzufuegen',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  templateUrl: './artikelhinzufuegen.component.html',
  styleUrl: './artikelhinzufuegen.component.css'
})
export class ArtikelhinzufuegenComponent {
  data = inject(MAT_DIALOG_DATA);
  myControl = new FormControl('');
  public kategorie: any[] = [];

  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.kategorie = this.data.kategorie
    console.log("Hallo",this.kategorie)
  }
  // ngAfterViewInit(): void {
  //   console.log('View Init', this.kategorie);
  // }
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    category: ['', Validators.required],  // Changed from secondCtrl to category
  });
  
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;
}
