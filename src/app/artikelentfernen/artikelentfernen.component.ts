import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArtikelService } from '../providers/artikel.service';

@Component({
  selector: 'app-artikelentfernen',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './artikelentfernen.component.html',
  styleUrl: './artikelentfernen.component.css'
})
export class ArtikelentfernenComponent implements OnInit{
  @Output() artikelGeloescht = new EventEmitter<void>();

  data = inject(MAT_DIALOG_DATA);
  public index: number | undefined;
  constructor(private dialogRef: MatDialogRef<ArtikelentfernenComponent>,private artikelService: ArtikelService){}
  ngOnInit(): void {
  this.index = this.data.index;
}
  deleteArtikel(){
    this.artikelService.deleteArtikel(this.index!).subscribe({
      next: (response) => {
        this.artikelGeloescht.emit()
        this.dialogRef.close();
      },
      error: (error) => {
      }
    });
  }
  abbrechen(){this.dialogRef.close();}
}
