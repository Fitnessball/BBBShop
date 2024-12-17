import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarenkorbentfernenComponent } from './warenkorbentfernen.component';

describe('WarenkorbentfernenComponent', () => {
  let component: WarenkorbentfernenComponent;
  let fixture: ComponentFixture<WarenkorbentfernenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarenkorbentfernenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarenkorbentfernenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
