import { Component, OnInit, Output } from '@angular/core';
import { SurahService } from '../surah.service';
import { ISurah } from '../surah';
import { Word } from '../word';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-surah-lines',
  templateUrl: './surah-lines.component.html',
  styleUrls: ['./surah-lines.component.css']
})

export class SurahLinesComponent implements OnInit {

  surah: ISurah;
  ayahs: Word[] = [];
  errorMessage: string;

  @Output() messageEvent = new EventEmitter();

  constructor(private surahService: SurahService) { }

  sendMessage(section: string, ayah: Word) {
    this.messageEvent.emit({ section: section, ayah: ayah, editMode: true});
  }

  ngOnInit(): void {
    this.surahService.getSurah().subscribe({
      next: s => {
        this.ayahs = this.breakdownSurah(s);
      },
      error: err => this.errorMessage = err
    })
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

  clickCallback(word: string, ayah: Word): void {
    console.log("Word clicked: " + word);
    console.log("Overall verse number clicked: " + ayah.overallVersenumber);
    console.log("Ayah number clicked: " + ayah.ayahNumberInSurah);
  }
}
