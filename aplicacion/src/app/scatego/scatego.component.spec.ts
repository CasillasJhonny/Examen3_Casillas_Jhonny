import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScategoComponent } from './scatego.component';

describe('ScategoComponent', () => {
  let component: ScategoComponent;
  let fixture: ComponentFixture<ScategoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScategoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScategoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
