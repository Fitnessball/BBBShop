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
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ArtikelentfernenComponent } from '../artikelentfernen/artikelentfernen.component';
import { KategorieentfernenComponent } from '../kategorieentfernen/kategorieentfernen.component';
import { KategorieHinzufuegenComponent } from '../kategorie-hinzufuegen/kategorie-hinzufuegen.component';
import { WarenkorbentfernenComponent } from '../warenkorbentfernen/warenkorbentfernen.component';
import pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-adminbbbshopliste',
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
    MatIconModule,
    CommonModule 
  ],
  providers: [DatePipe],
  templateUrl: './adminbbbshopliste.component.html',
  styleUrls: ['./adminbbbshopliste.component.css']
})
export class AdminbbbshoplisteComponent implements AfterViewInit, OnInit {
  dialog = inject(MatDialog);
  currentDate: String;
  editModeActive: boolean = false;
  element = { anzahl: 0 };
  public artikel: any[] = [];
  public kategorie: any[] = [];
  public warenkorb: any[] = [];
  public warenkorbbackup: any[] = [];
  public warenkorbbezeichner: any[] = [];

  dataSource = new MatTableDataSource<any>();
  selectedCategories: string[] = [];
  displayedColumns: string[] = ['liste_index','r_nr', 'artikel', 'kategorie', 'gebinde','delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private datePipe: DatePipe, private artikelService: ArtikelService, private cdr: ChangeDetectorRef) {
    const now = new Date();
    this.currentDate = this.datePipe.transform(now, 'dd.MM.yyyy') || '';
   }

  ngOnInit(): void {
    this.artikelService.getartikel().subscribe(data => {
      this.artikel = data.map((item: any, index: number) => ({
        ...item,
        liste_index: index + 1
      }));
      this.dataSource.data = this.artikel; 
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
    this.artikelService.getWarenkorb().subscribe(data => {
      // console.log(data)
      this.warenkorbbackup = data;
      this.warenkorbbezeichner = this.getUniqueIdWarenkorbPairs(this.warenkorbbackup)
      console.log(this.warenkorbbezeichner)
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUniqueIdWarenkorbPairs(artikelArray: any[]): { id: number, warenkorbbezeichner: string }[] {
    const uniquePairs: { id: number, warenkorbbezeichner: string }[] = [];
    const processedIds = new Set<number>(); // Set zum Speichern bereits verarbeiteter IDs
  
    artikelArray.forEach(item => {
      if (!processedIds.has(item.id) && item.warenkorbbezeichner) {
        processedIds.add(item.id);
        uniquePairs.push({ id: item.id, warenkorbbezeichner: item.warenkorbbezeichner });
      }
    });
  
    return uniquePairs;
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
  openKategorie() {
    const dialogRef = this.dialog.open(KategorieHinzufuegenComponent, {
      data: {
        kategorie: this.kategorie,
        artikel: this.artikel
      }
    });
    dialogRef.componentInstance.kategorieHinzugefuegt.subscribe(() => {
      this.artikelService.getartikel().subscribe(data => {
        this.artikel = data.map((item: any, index: number) => ({
          ...item,
          liste_index: index + 1
        }));
        this.dataSource.data = this.artikel; 
      });
      this.artikelService.getkategorie().subscribe(data => {
        this.kategorie = data;
      });
    });
  }

  openDelete(index: number){
    console.log(index);
    const dialogRef = this.dialog.open(ArtikelentfernenComponent, {
      data: {
        index: index
      }
    });
    dialogRef.componentInstance.artikelGeloescht.subscribe(() => {
      this.artikelService.getartikel().subscribe(data => {
        this.artikel = data.map((item: any, index: number) => ({
          ...item,
          liste_index: index + 1
        }));
        this.dataSource.data = this.artikel; 
      });
    });
  }

  openDeleteKategorie(index: number){
    const dialogRef = this.dialog.open(KategorieentfernenComponent, {
      data: {
        index: index
      }
    });
    dialogRef.componentInstance.KategorieGeloescht.subscribe(() => {
      this.artikelService.getartikel().subscribe(data => {
        this.artikel = data.map((item: any, index: number) => ({
          ...item,
          liste_index: index + 1
        }));
        this.dataSource.data = this.artikel; 
      });
      this.artikelService.getkategorie().subscribe(data => {
        this.kategorie = data;
      });
      this.dataSource.data = this.artikel; 
      this.cdr.detectChanges();
    });

  }
  openDeleteWarenkorb(id: number){
    console.log(id)
    const dialogRef = this.dialog.open(WarenkorbentfernenComponent, {
      data: {
        id: id
      }
    });
    dialogRef.componentInstance.WarenkorbGeloescht.subscribe(() => {
      this.artikelService.getWarenkorb().subscribe(data => {
        this.warenkorbbackup = data;
      this.warenkorbbezeichner = this.getUniqueIdWarenkorbPairs(this.warenkorbbackup)

      });
      this.cdr.detectChanges();
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
   
        this.artikelService.resetcounter(0).subscribe({
          next: (response) => {
          },
          error: (error) => {
            console.error('Error', error);
          }
        });

      this.artikelService.getartikel().subscribe(data => {
        this.artikel = data.map((item: any, index: number) => ({
          ...item,
          liste_index: index + 1
        }));
        // this.dataSource.data = this.artikel;
        this.warenkorb = [];
        this.artikel.forEach((item) => {
          if (item.anzahl > 0) {
            this.updateWarenkorb(item);
          }
        });
      });
      this.cdr.detectChanges();
      } else if (result === undefined) {
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
  editMode() {
    this.editModeActive = !this.editModeActive;
    this.artikelService.getartikel().subscribe(data => {
      this.artikel = data.map((item: any, index: number) => ({
        ...item,
        liste_index: index + 1
      }));
      this.dataSource.data = this.artikel; 
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
  trackOption(index: number, option: any): string {
    return option.id;
  }
  onValueChange(element: any, field: string, value: any) {
    element[field] = value;
    console.log(element)
    this.artikelService.setedit(element.a_nr,element.r_nr,element.artikel,element.kategorie,element.anzahl,element.gebinde,element.k_id).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }
  onKategorieChange(selectedOption: { k_id: number, k_name: string },element: any) {
    this.artikelService.setedit(element.a_nr,element.r_nr,element.artikel,selectedOption.k_name,element.anzahl,element.gebinde,selectedOption.k_id).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }
  onTagChange(element: any, field: string, value: string){
    element[field] = value;
    console.log(element)
    console.log(field)
    console.log(value)
    this.artikelService.setTag(element.k_id,element.k_name).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
    this.artikelService.setATag(element.k_id,element.k_name).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
     
  }
  onAnzahlChange(element: any) {
    if (element.anzahl < 0) { element.anzahl = 0; }
    if (element.anzahl === null) { element.anzahl = 0; }

    this.artikelService.setcounter(element.a_nr, element.anzahl).subscribe({
      next: (response) => {
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
        this.warenkorb[index].artikel = element.artikel;
      }
    } else if (element.anzahl === 0 && index !== -1) {
      this.warenkorb.splice(index, 1);
    }
    this.cdr.detectChanges();
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
  generatePDF(warenkorbname: string,targetId:number) {
    const filterarray = this.warenkorbbackup.filter(item => item.id === targetId);
    const sortedWarenkorb = filterarray.sort((a, b) => (a.r_nr || 0) - (b.r_nr || 0));
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
