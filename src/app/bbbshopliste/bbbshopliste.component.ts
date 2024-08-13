import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { ArtikelService } from '../providers/artikel.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
    MatButtonModule
  ],
  templateUrl: './bbbshopliste.component.html',
  styleUrls: ['./bbbshopliste.component.css']
})
export class BbbshoplisteComponent implements AfterViewInit, OnInit {
  public artikel: any[] = [];
  public kategorie: any[] = [];
  selectedValue = '';
  dataSource = new MatTableDataSource<any>();
  selectedCategories: string[] = []; // Array to track selected categories

  displayedColumns: string[] = ['liste_index', 'artikel', 'kategorie', 'anzahl', 'gebinde'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private artikelService: ArtikelService) {}

  ngOnInit(): void {
    this.artikelService.getartikel().subscribe(data => {
      this.artikel = data.map((item: any, index: number) => ({
        ...item,
        liste_index: index + 1
      }));
      this.dataSource.data = this.artikel;
      console.log(this.dataSource.data)
    });
    this.artikelService.getkategorie().subscribe(data => {
      this.kategorie = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAnzahlChange(element: any) {
    if (element.anzahl < 0) { element.anzahl = 0 }
    if (element.anzahl === null) { element.anzahl = 0 }
    console.log('Anzahl changed:', element);
    this.artikelService.setcounter(element.a_nr, element.anzahl).subscribe({
      next: (response) => {
        console.log('Update Erfolgreich', response);
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }

  onChipSelectionChange(event: MatChipSelectionChange, tag: any): void {
    if (event.selected) {
      // Add the selected category to the array
      this.selectedCategories.push(tag.k_name);
    } else {
      // Remove the unselected category from the array
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== tag.k_name);
    }

    this.filterData();
  }

  filterData(): void {
    if (this.selectedCategories.length > 0) {
      // Filter the dataSource based on selected categories
      this.dataSource.data = this.artikel.filter(artikel => 
        this.selectedCategories.includes(artikel.kategorie)
      );
    } else {
      // If no categories are selected, show all data
      this.dataSource.data = this.artikel;
    }

    // Reset the paginator after filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
