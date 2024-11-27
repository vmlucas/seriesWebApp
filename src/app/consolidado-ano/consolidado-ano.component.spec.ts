import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoAnoComponent } from './consolidado-ano.component';

describe('ConsolidadoAnoComponent', () => {
  let component: ConsolidadoAnoComponent;
  let fixture: ComponentFixture<ConsolidadoAnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolidadoAnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsolidadoAnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
