import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArtikelService } from '../providers/artikel.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-warenkorbentfernen',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './warenkorbentfernen.component.html',
  styleUrl: './warenkorbentfernen.component.css'
})
export class WarenkorbentfernenComponent implements OnInit{
  @Output() WarenkorbGeloescht = new EventEmitter<void>();

  data = inject(MAT_DIALOG_DATA);
  public id: number | undefined;
  constructor(private dialogRef: MatDialogRef<WarenkorbentfernenComponent>,private artikelService: ArtikelService){}
  ngOnInit(): void {
  this.id = this.data.id;
}
deleteWarenkorb(){
  console.log(this.id)
    this.artikelService.deleteWarenkorb(this.id!).subscribe({
      next: (response) => {
        this.WarenkorbGeloescht.emit()
        this.dialogRef.close();
      },
      error: (error) => {
      }
    });
  }
  abbrechen(){this.dialogRef.close();}
}
