import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieHinzufuegenComponent } from './kategorie-hinzufuegen.component';

describe('KategorieHinzufuegenComponent', () => {
  let component: KategorieHinzufuegenComponent;
  let fixture: ComponentFixture<KategorieHinzufuegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KategorieHinzufuegenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategorieHinzufuegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
