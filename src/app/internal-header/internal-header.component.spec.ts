import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalHeaderComponent } from './internal-header.component';

describe('InternalHeaderComponent', () => {
  let component: InternalHeaderComponent;
  let fixture: ComponentFixture<InternalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
