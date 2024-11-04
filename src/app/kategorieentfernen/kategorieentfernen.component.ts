import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArtikelentfernenComponent } from '../artikelentfernen/artikelentfernen.component';
import { ArtikelService } from '../providers/artikel.service';

@Component({
  selector: 'app-kategorieentfernen',
  standalone: true,
  imports: [],
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
