import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesAreaComponent } from './notes-area.component';

describe('NotesAreaComponent', () => {
  let component: NotesAreaComponent;
  let fixture: ComponentFixture<NotesAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
