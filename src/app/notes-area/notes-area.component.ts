import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { Packer } from 'docx';
import * as fs from 'file-saver';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DocumentGenerator } from '../document-generator';
import { ISurah } from '../surah';
import { SurahService } from '../surah.service';
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

  ayahs: Word[] = [];
  errorMessage: string;
  userText: string;
  isVisible: boolean = false;
  
  constructor(private surahService: SurahService, @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit(): void {
    this.surahService.getSurah().subscribe({
      next: s => {
        this.ayahs = this.breakdownSurah(s);
      },
      error: err => this.errorMessage = err
    })
  }

  ngOnChanges(): void {
    if(this.word != undefined) {
      let storageKey = this.ayah.ayahNumberInSurah + ":" + this.ayah.overallVersenumber + ":" + this.word;
      this.userText = this.storage.get(storageKey);
    }
  }

  breakdownSurah(surah:ISurah): Word[] {

    let splittedAyahs: Word[] = [];
    let bismillah: string = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

    //'count' is to allow the removal of Bismillah from the first verse in each surah, if it exists
    let count: number = 0;

    for(var section of surah.data[0].ayahs) {

      let splittedWord: Word = new Word();

      if(section.text.includes(bismillah) && count == 0){
        splittedWord.splitWord = section.text.replace(bismillah, "").split(" ");
        splittedWord.overallVersenumber = section.number;
        splittedWord.ayahNumberInSurah = section.numberInSurah;
      }
      else {
        splittedWord.splitWord = section.text.split(" ");
        splittedWord.overallVersenumber = section.number;
        splittedWord.ayahNumberInSurah = section.numberInSurah;
      }

      splittedAyahs.push(splittedWord);
      count++;
    }

    return splittedAyahs;
  }
  
  saveNotes() {
    let storageKey = this.ayah.ayahNumberInSurah + ":" + this.ayah.overallVersenumber + ":" + this.word;
    this.storage.set(storageKey, this.userText);

    this.isVisible = true;
    setTimeout(()=> this.isVisible = false, 2500);
  }

  download(): void {
    const documentCreator  = new DocumentGenerator();
    const doc = documentCreator.create(this.ayahs, this.storage);

    Packer.toBlob(doc).then(buffer => {
      console.log(buffer);
      fs.saveAs(buffer, "Surah An-Nas notes.docx");
      console.log("Document created successfully");
    })
  }

}
