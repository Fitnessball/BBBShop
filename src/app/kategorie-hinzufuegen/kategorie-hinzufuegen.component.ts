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
  selector: 'app-kategorie-hinzufuegen',
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
  templateUrl: './kategorie-hinzufuegen.component.html',
  styleUrl: './kategorie-hinzufuegen.component.css'
})
export class KategorieHinzufuegenComponent implements OnInit {
  @Output() kategorieHinzugefuegt = new EventEmitter<void>();
  data = inject(MAT_DIALOG_DATA);
  myControl = new FormControl('');
  public kategorie: any[] = [];
  public artikel: any[] = [];
  constructor(private _formBuilder: FormBuilder, private artikelService: ArtikelService,private dialogRef: MatDialogRef<KategorieHinzufuegenComponent>) { }
  
  ngOnInit(): void {
    this.kategorie = this.data.kategorie
    this.artikel = this.data.artikel
    // console.log(this.artikel.length)
    // console.log("Hallo", this.kategorie)
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required, Validators.pattern('^.{3,}$'), Validators.maxLength(20)]]
  });
  

  

  isLinear = true;

  addKategorie() {

    const kategorie = this.firstFormGroup.get('firstCtrl')?.value;
    console.log(kategorie)

    if (this.firstFormGroup.valid) {

      this.artikelService.insertKategorie(this.kategorie.length + 1,kategorie!).subscribe({
        next: (response) => {
          // console.log('Hinzufügen des Artikel erfolgreich', response);
          this.kategorieHinzugefuegt.emit();
          this.dialogRef.close();
        },
        error: (error) => {
          // console.error('Fehler beim erstellen des Artikel', error);
        }
      });
    } else {
      // console.log("Bitte füllen Sie alle Felder korrekt aus.");
    }

  }

}
