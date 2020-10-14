import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Word } from '../word';

@Component({
  selector: 'app-notes-area',
  templateUrl: './notes-area.component.html',
  styleUrls: ['./notes-area.component.css']
})

export class NotesAreaComponent implements OnInit, OnChanges {

  @Input() word: string;
  @Input() ayah: Word;
  @Input() editMode: boolean;

  userText: string;
  
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    console.log('CLICKED ON NEW WORD');

    if(this.word != undefined) {
      let storageKey = this.ayah.ayahNumberInSurah + ":" + this.ayah.overallVersenumber + ":" + this.word;
      this.userText = this.storage.get(storageKey);
      console.log('Text to populate: ' + this.userText);
    }
  }

  saveNotes() {
    //console.log('NOTES: ' + this.notes);
    let storageKey = this.ayah.ayahNumberInSurah + ":" + this.ayah.overallVersenumber + ":" + this.word;
    this.storage.set(storageKey, this.userText);

    console.log('GETTING FROM STORAGE: ' + this.storage.get(storageKey));
  }

}
