
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { ArtikelService } from '../providers/artikel.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-bottomsheet',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './bottomsheet.component.html',
  styleUrl: './bottomsheet.component.css'
})
export class ArtikelBottomsheetComponent implements OnInit{
  public kategorie: any[] = [];

  constructor(private cdRef: ChangeDetectorRef,private artikelService: ArtikelService,private bottomSheetRef: MatBottomSheetRef<ArtikelBottomsheetComponent>, private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.artikelService.getkategorie().subscribe(data => {
      this.kategorie = data;
      console.log(this.kategorie)
      this.cdRef.detectChanges(); 
    });
  }
  ngAfterViewInit(): void {
    console.log('View Init', this.kategorie);
  }
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    category: ['', Validators.required],  // Changed from secondCtrl to category
  });
  
  isLinear = false;
  closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }
}