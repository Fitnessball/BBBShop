import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { ArtikelService } from '../providers/artikel.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bbbshopliste',
  standalone: true,
  imports: [
    MatTableModule,
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
export class BbbshoplisteComponent implements OnInit {
  title = 'WarenkorbSystem';
  selectedValue = '';
  public artikel: any[] = [];

  displayedColumns: string[] = ['a_nr', 'artikel', 'kategorie', 'anzahl', 'gebinde'];
  dataSource = this.artikel;

  constructor(private artikelService: ArtikelService) {}

  ngOnInit(): void {
    this.artikelService.getartikel().subscribe(data => {
      this.artikel = data;
      console.log(this.artikel);
      this.dataSource = this.artikel; // Update dataSource with the actual data
    });
  }
  addNewRow() {}


  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

}
