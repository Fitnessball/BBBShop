import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { ArtikelService } from '../providers/artikel.service';

@Component({
  selector: 'app-bbbshopliste',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatChipsModule, MatListModule],
  templateUrl: './bbbshopliste.component.html',
  styleUrls: ['./bbbshopliste.component.css']
})
export class BbbshoplisteComponent implements OnInit {
  title = 'WarenkorbSystem';

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
}
