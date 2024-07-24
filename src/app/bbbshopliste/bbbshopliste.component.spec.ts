import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbbshoplisteComponent } from './bbbshopliste.component';

describe('BbbshoplisteComponent', () => {
  let component: BbbshoplisteComponent;
  let fixture: ComponentFixture<BbbshoplisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BbbshoplisteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbbshoplisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
