import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ArtikelService } from '../providers/artikel.service';
@Component({
  selector: 'app-artikelhinzufuegen',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: false },
    },
  ],
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
  @Output() artikelHinzugefuegt = new EventEmitter<void>();
  data = inject(MAT_DIALOG_DATA);
  myControl = new FormControl('');
  public kategorie: any[] = [];
  public artikel: any[] = [];

  constructor(private _formBuilder: FormBuilder, private artikelService: ArtikelService) { }
  ngOnInit(): void {
    this.kategorie = this.data.kategorie
    this.artikel = this.data.artikel
    console.log(this.artikel.length)
    console.log("Hallo", this.kategorie)
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
  });

  secondFormGroup = this._formBuilder.group({
    myControl: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
  });

  isLinear = false;

  addArtikel() {
    const artikelName = this.firstFormGroup.get('firstCtrl')?.value;
    const kategorie = this.secondFormGroup.get('myControl')?.value;
    const gebinde = this.thirdFormGroup.get('thirdCtrl')?.value;

    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      console.log("Artikel hinzugefügt");

      console.log('Artikel Name:', artikelName);
      console.log('Kategorie:', kategorie);
      console.log('Gebinde:', gebinde);
      console.log('Second FormGroup:', this.secondFormGroup.value);

      this.artikelService.insertArtikel(this.artikel.length + 1, 0, artikelName!, kategorie!, 0, gebinde!).subscribe({
        next: (response) => {
          console.log('Hinzufügen des Artikel erfolgreich', response);
          this.artikelHinzugefuegt.emit();

        },
        error: (error) => {
          console.error('Fehler beim erstellen des Artikel', error);
        }
      });
    } else {
      console.log("Bitte füllen Sie alle Felder korrekt aus.");
    }

  }


}