import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarenkorbfensterComponent } from './warenkorbfenster.component';

describe('WarenkorbfensterComponent', () => {
  let component: WarenkorbfensterComponent;
  let fixture: ComponentFixture<WarenkorbfensterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarenkorbfensterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarenkorbfensterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
