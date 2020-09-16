import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurahLinesComponent } from './surah-lines.component';

describe('SurahLinesComponent', () => {
  let component: SurahLinesComponent;
  let fixture: ComponentFixture<SurahLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurahLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurahLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
