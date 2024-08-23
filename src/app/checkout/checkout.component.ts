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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatIconModule } from '@angular/material/icon';
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

  userLogin(){
    const username = this.firstFormGroup.get('firstCtrl')?.value;
    const userpasswort = this.firstFormGroup.get('secondCtrl')?.value;
  
    console.log('Username:', username);
    console.log('Password:', userpasswort);
  
    if (this.firstFormGroup.valid) {
      this.artikelService.login(username!, userpasswort!).subscribe({
        next: (response) => {
          console.log('Login erfolgreich', response);
          this.dialogRef.close();
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
    const data = document.getElementById('contentToConvert');
    
    if (data) {
      html2canvas(data).then(canvas => {
        // Konvertiere das Canvas zu einem Bild
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('download.pdf');
      });
    }
  }

}
