import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ArtikelService } from '../providers/artikel.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-kategorieentfernen',
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
  templateUrl: './kategorieentfernen.component.html',
  styleUrl: './kategorieentfernen.component.css'
})
export class KategorieentfernenComponent implements OnInit{
  @Output() KategorieGeloescht = new EventEmitter<void>();

  data = inject(MAT_DIALOG_DATA);
  public index: number | undefined;
  constructor(private dialogRef: MatDialogRef<KategorieentfernenComponent>,private artikelService: ArtikelService){}
  ngOnInit(): void {
  this.index = this.data.index;
}
deleteKategorie(){
    this.artikelService.deleteKategorie(this.index!).subscribe({
      next: (response) => {
        this.KategorieGeloescht.emit()
        this.dialogRef.close();
      },
      error: (error) => {
      }
    });
  }
  abbrechen(){this.dialogRef.close();}
}
