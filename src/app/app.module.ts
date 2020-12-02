import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SurahLinesComponent } from './surah-lines/surah-lines.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NotesAreaComponent } from './notes-area/notes-area.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ImportExportNotesComponent } from './import-export-notes/import-export-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    SurahLinesComponent,
    NotesAreaComponent,
    HomeComponent,
    ImportExportNotesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule, 
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full'} 
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
