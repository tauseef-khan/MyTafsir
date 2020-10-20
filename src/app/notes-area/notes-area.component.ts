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
  isVisible: boolean = false;
  
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.word != undefined) {
      let storageKey = this.ayah.ayahNumberInSurah + ":" + this.ayah.overallVersenumber + ":" + this.word;
      this.userText = this.storage.get(storageKey);
    }
  }

  saveNotes() {
    let storageKey = this.ayah.ayahNumberInSurah + ":" + this.ayah.overallVersenumber + ":" + this.word;
    this.storage.set(storageKey, this.userText);

    this.isVisible = true;
    setTimeout(()=> this.isVisible = false, 2500);
  }

}
