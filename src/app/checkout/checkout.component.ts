import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatIconModule } from '@angular/material/icon';
import { ArtikelhinzufuegenComponent } from '../artikelhinzufuegen/artikelhinzufuegen.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-checkout',
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
    MatAutocompleteModule,
    MatIconModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  @Output() checkout = new EventEmitter<void>();
  data = inject(MAT_DIALOG_DATA);
  myControl = new FormControl('');
  public warenkorb: any[] = [];
  constructor(private _formBuilder: FormBuilder, private artikelService: ArtikelService, private dialogRef: MatDialogRef<CheckoutComponent>) { }

  ngOnInit(): void {
    this.warenkorb = this.data.warenkorb
    console.log(this.warenkorb)
  }
    firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required, Validators.pattern('^.{3,}$')]],
    secondCtrl: ['', [Validators.required, Validators.pattern('^.{3,}$')]]
  });
  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  userLogin() {
    const username = this.firstFormGroup.get('firstCtrl')?.value;
    const userpasswort = this.firstFormGroup.get('secondCtrl')?.value;

    if (this.firstFormGroup.valid) {
      this.artikelService.login(username!, userpasswort!).subscribe({
        next: (response) => {
          console.log('Login erfolgreich', response);
          this.generatePDF();
          this.dialogRef.close('success'); // Close dialog with 'success' result
        },
        error: (error) => {
          console.error('Fehler beim Login', error);
        }
      });
    } else {
      console.log("Bitte füllen Sie alle Felder korrekt aus.");
    }
  }
  
  
  generatePDF() {
    const documentDefinition = {
      content: [
        { text: 'Warenkorb Details', style: 'header' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1, // Specify that there is one header row
            body: [
              // Header Row
              [
                { text: 'Nr', bold: true },
                { text: 'Regal Nr.', bold: true },
                { text: 'Artikel', bold: true },
                { text: 'Kategorie', bold: true },
                { text: 'Anzahl', bold: true },
                { text: 'Gebinde', bold: true },
                
              ],
              // Data Rows
              ...this.warenkorb.map(item => [
                item.a_nr || '0',  // Fallback if `name` is missing
                item.r_nr || '0',  // Fallback if `name` is missing
                item.artikel || 'nd',       // Fallback if `quantity` is missing
                item.kategorie || 'nd',       // Fallback if `quantity` is missing
                item.anzahl || 'nd',       // Fallback if `quantity` is missing
                item.gebinde || 'nd',       // Fallback if `quantity` is missing
              ])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        tableExample: {
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('warenkorb.pdf');
  }

}
