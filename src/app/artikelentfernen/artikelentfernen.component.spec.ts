import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelentfernenComponent } from './artikelentfernen.component';

describe('ArtikelentfernenComponent', () => {
  let component: ArtikelentfernenComponent;
  let fixture: ComponentFixture<ArtikelentfernenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtikelentfernenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtikelentfernenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
