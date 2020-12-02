import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportNotesComponent } from './import-export-notes.component';

describe('ImportExportNotesComponent', () => {
  let component: ImportExportNotesComponent;
  let fixture: ComponentFixture<ImportExportNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExportNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
