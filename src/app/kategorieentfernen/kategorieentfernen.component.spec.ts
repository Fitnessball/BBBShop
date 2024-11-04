import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieentfernenComponent } from './kategorieentfernen.component';

describe('KategorieentfernenComponent', () => {
  let component: KategorieentfernenComponent;
  let fixture: ComponentFixture<KategorieentfernenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KategorieentfernenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategorieentfernenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
