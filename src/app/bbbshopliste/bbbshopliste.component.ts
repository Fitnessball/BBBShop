import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
@Component({
  selector: 'app-bbbshopliste',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatChipsModule, MatListModule],
  templateUrl: './bbbshopliste.component.html',
  styleUrl: './bbbshopliste.component.css'
})
export class BbbshoplisteComponent {
  title = 'WarenkorbSystem';
  displayedColumns: string[] = ['artikel_position', 'artikel_name', 'artikel_kategorie', 'artikel_anzahl', 'artikel_gebinde'];
  dataSource = ELEMENT_DATA;
}
export interface PeriodicElement {
  artikel_position: number;
  artikel_name: string;
  artikel_kategorie: string;
  artikel_anzahl: number;
  artikel_gebinde: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {artikel_position: 1, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
  {artikel_position: 2, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
  {artikel_position: 3, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
  {artikel_position: 4, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
  {artikel_position: 5, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
  {artikel_position: 6, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
  {artikel_position: 7, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
  {artikel_position: 8, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
  {artikel_position: 9, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
  {artikel_position: 10, artikel_name: 'placeholder', artikel_kategorie: 'placeholder', artikel_anzahl: 0, artikel_gebinde: 'placeholder'},
];
