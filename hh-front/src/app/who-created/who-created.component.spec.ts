import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoCreatedComponent } from './who-created.component';

describe('WhoCreatedComponent', () => {
  let component: WhoCreatedComponent;
  let fixture: ComponentFixture<WhoCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoCreatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
