import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelhinzufuegenComponent } from './artikelhinzufuegen.component';

describe('ArtikelhinzufuegenComponent', () => {
  let component: ArtikelhinzufuegenComponent;
  let fixture: ComponentFixture<ArtikelhinzufuegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtikelhinzufuegenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtikelhinzufuegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
