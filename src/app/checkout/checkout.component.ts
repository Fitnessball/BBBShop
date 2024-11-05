import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ArtikelService } from '../providers/artikel.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { WarenkorbfensterComponent } from '../warenkorbfenster/warenkorbfenster.component';
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
  providers: [DatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  @Output() checkout = new EventEmitter<void>();
  data = inject(MAT_DIALOG_DATA);
  myControl = new FormControl('');
  public warenkorb: any[] = [];
  currentDate: string;
  dialog = inject(MatDialog);

  constructor(private datePipe: DatePipe, private _formBuilder: FormBuilder, private artikelService: ArtikelService, private dialogRef: MatDialogRef<CheckoutComponent>) { 
    const now = new Date();
    this.currentDate = this.datePipe.transform(now, 'dd.MM.yyyy') || '';
  }

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
          this.openWarenkorb();
          
          this.dialogRef.close('success');
        },
        error: (error) => {
          console.error('Fehler beim Login', error);
        }
      });
    } else {
      console.log("Bitte füllen Sie alle Felder korrekt aus.");
    }
  }
  
  generateRandomNumber(): number {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return randomNumber;
  }
  openWarenkorb() {
    const dialogRef = this.dialog.open(WarenkorbfensterComponent, {
      data: {
      }
    });
  
    dialogRef.componentInstance.warenkorbHinzugefuegt.subscribe((warenkorb: string) => {
      console.log(warenkorb)
      this.checkout.emit();
      const genereated_id = this.generateRandomNumber() 
      this.generatePDF(warenkorb);
      this.warenkorb.forEach((item, index) => {
        console.log(`Item ${index + 1}:`, item.anzahl);
       this.artikelService.insertWarenkorb(genereated_id,item.a_nr,item.r_nr,item.artikel,item.kategorie,item.anzahl,item.gebinde).subscribe({
         next: (response) => {
           // console.log('Hinzufügen des Artikel erfolgreich', response);

           },
           error: (error) => {
             // console.error('Fehler beim erstellen des Artikel', error);
           }
         });
    });
    });
  }
  
  
  generatePDF(warenkorbname: string) {
    const sortedWarenkorb = this.warenkorb.sort((a, b) => (a.r_nr || 0) - (b.r_nr || 0));
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
              ...sortedWarenkorb.map(item => [
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
    // console.log(genereated_id)
    pdfMake.createPdf(documentDefinition).download(warenkorbname+".pdf");
  }

}
