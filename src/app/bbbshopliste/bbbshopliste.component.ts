import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { ArtikelService } from '../providers/artikel.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ArtikelhinzufuegenComponent } from '../artikelhinzufuegen/artikelhinzufuegen.component';
import { MatIconModule } from '@angular/material/icon';
import { CheckoutComponent } from '../checkout/checkout.component';


@Component({
  selector: 'app-bbbshopliste',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule 
  ],
  templateUrl: './bbbshopliste.component.html',
  styleUrls: ['./bbbshopliste.component.css']
})
export class BbbshoplisteComponent implements AfterViewInit, OnInit {
  dialog = inject(MatDialog);
  element = { anzahl: 0 };
  public artikel: any[] = [];
  public kategorie: any[] = [];
  public warenkorb: any[] = [];
  selectedValue = '';
  dataSource = new MatTableDataSource<any>();
  selectedCategories: string[] = [];
  displayedColumns: string[] = ['liste_index', 'artikel', 'kategorie', 'gebinde', 'anzahl'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private artikelService: ArtikelService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.artikelService.getartikel().subscribe(data => {
      this.artikel = data.map((item: any, index: number) => ({
        ...item,
        liste_index: index + 1
      }));
      this.dataSource.data = this.artikel; 
      // console.log(this.dataSource.data);
  
      // Warenkorb aktualisieren
      this.artikel.forEach((item) => {
        if (item.anzahl > 0) {
          this.updateWarenkorb(item);
        }
      });
    });
  
    this.artikelService.getkategorie().subscribe(data => {
      this.kategorie = data;
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openArtikel() {
    const dialogRef = this.dialog.open(ArtikelhinzufuegenComponent, {
      data: {
        kategorie: this.kategorie,
        artikel: this.artikel
      }
    });

    dialogRef.componentInstance.artikelHinzugefuegt.subscribe(() => {
      this.artikelService.getartikel().subscribe(data => {
        this.artikel = data.map((item: any, index: number) => ({
          ...item,
          liste_index: index + 1
        }));
        this.dataSource.data = this.artikel; 
      });
    });
  }
  openCheckout(){
    const dialogRef = this.dialog.open(CheckoutComponent, {
      data: {
        warenkorb: this.warenkorb
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.warenkorb.forEach(item => {
            console.log(item)
        this.artikelService.setcounter(item.a_nr, 0).subscribe({
          next: (response) => {
            this.updateWarenkorb;

          },
          error: (error) => {
            console.error('Error', error);
          }
        });
      });
      this.artikelService.getartikel().subscribe(data => {
        console.log(this.artikel)
        this.artikel = data.map((item: any, index: number) => ({
          ...item,
          liste_index: index + 1
        }));
        this.dataSource.data = this.artikel;
        this.warenkorb = [];
        this.artikel.forEach((item) => {
          if (item.anzahl > 0) {
            this.updateWarenkorb(item);
          }
        });
      });
      this.cdr.detectChanges();
      //fehler mit clearen liegt am index und der nummer da diese geändert wurden
      } else if (result === undefined) {
        // Handle dialog closure without confirmation
        console.log('Checkout dialog closed without confirmation.');
      }
    });
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAnzahlChange(element: any) {
    if (element.anzahl < 0) { element.anzahl = 0; }
    if (element.anzahl === null) { element.anzahl = 0; }
    // console.log('Anzahl changed:', element);

    this.artikelService.setcounter(element.a_nr, element.anzahl).subscribe({
      next: (response) => {
        // console.log('Update Erfolgreich', response);

        this.updateWarenkorb(element);

      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }

  updateWarenkorb(element: any) {
    const index = this.warenkorb.findIndex(item => item.a_nr === element.a_nr);
  
    if (element.anzahl > 0) {
      if (index === -1) {
        this.warenkorb.push({ ...element });
      } else {
        this.warenkorb[index].anzahl = element.anzahl;
      }
    } else if (element.anzahl === 0 && index !== -1) {
      this.warenkorb.splice(index, 1);
    }
    this.cdr.detectChanges(); // Erkennt änderungen in den Variablen
    // console.log('Warenkorb:', this.warenkorb);
  }
  
  onChipSelectionChange(event: MatChipSelectionChange, tag: any): void {
    if (event.selected) {
      this.selectedCategories.push(tag.k_name);
    } else {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== tag.k_name);
    }

    this.filterData();
  }

  filterData(): void {
    if (this.selectedCategories.length > 0) {
      this.dataSource.data = this.artikel.filter(artikel =>
        this.selectedCategories.includes(artikel.kategorie)
      );
    } else {
      this.dataSource.data = this.artikel;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); 
    }
  }
}
