import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbbbshoplisteComponent } from './adminbbbshopliste.component';

describe('AdminbbbshoplisteComponent', () => {
  let component: AdminbbbshoplisteComponent;
  let fixture: ComponentFixture<AdminbbbshoplisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminbbbshoplisteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminbbbshoplisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
