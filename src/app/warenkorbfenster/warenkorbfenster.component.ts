import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ArtikelService } from '../providers/artikel.service';

@Component({
  selector: 'app-warenkorbfenster',
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
  templateUrl: './warenkorbfenster.component.html',
  styleUrl: './warenkorbfenster.component.css'
})
export class WarenkorbfensterComponent implements OnInit {
  @Output() warenkorbHinzugefuegt = new EventEmitter<string>();
  data = inject(MAT_DIALOG_DATA);
  myControl = new FormControl('');

  constructor(private _formBuilder: FormBuilder, private artikelService: ArtikelService,private dialogRef: MatDialogRef<WarenkorbfensterComponent>) { }
  
  ngOnInit(): void {

  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required, Validators.pattern('^.{3,}$')]]
  });

  isLinear = true;

  addwarenkorb() {

    const warenkorb = this.firstFormGroup.get('firstCtrl')?.value;
    console.log(warenkorb)

    if (this.firstFormGroup.valid) {
          this.warenkorbHinzugefuegt.emit(warenkorb!);
          this.dialogRef.close();
        }
    else {
      // console.log("Bitte füllen Sie alle Felder korrekt aus.");
    }

  }

}
