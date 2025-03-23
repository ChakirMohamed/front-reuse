import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConventionsComponent } from './list-conventions.component';

describe('ListConventionsComponent', () => {
  let component: ListConventionsComponent;
  let fixture: ComponentFixture<ListConventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConventionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
