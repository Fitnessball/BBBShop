import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomsheetComponent } from './bottomsheet.component';

describe('BottomsheetComponent', () => {
  let component: BottomsheetComponent;
  let fixture: ComponentFixture<BottomsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomsheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
