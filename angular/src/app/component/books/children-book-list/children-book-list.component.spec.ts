import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenBookListComponent } from './children-book-list.component';

describe('ChildrenBookListComponent', () => {
  let component: ChildrenBookListComponent;
  let fixture: ComponentFixture<ChildrenBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
