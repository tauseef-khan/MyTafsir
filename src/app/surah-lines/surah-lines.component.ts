import { Component, OnInit } from '@angular/core';
import { SurahService } from '../surah.service';
import { ISurah } from '../surah';
import { IWord } from '../word';

@Component({
  selector: 'app-surah-lines',
  templateUrl: './surah-lines.component.html',
  styleUrls: ['./surah-lines.component.css']
})

export class SurahLinesComponent implements OnInit {

  surah: ISurah;
  ayahs: IWord[] = [];
  errorMessage: string;

  constructor(private surahService: SurahService) { }

  ngOnInit(): void {
    this.surahService.getSurah().subscribe({
      next: s => {
        this.ayahs = this.breakdownSurah(s);
      },
      error: err => this.errorMessage = err
    })
  }

  breakdownSurah(surah:ISurah): IWord[] {

    let abc: IWord[] = [];
    let bismillah: string = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

    //'count' is to allow the removal of Bismillah from the first verse in each surah
    let count: number = 0;

    for(var section of surah.data[0].ayahs) {

      let cde: IWord = new IWord();

      if(section.text.includes(bismillah) && count == 0){
        cde.splitWord = section.text.replace(bismillah, "").split(" ");
        cde.totalVersenumber = section.number;
        cde.numberInSurah = section.numberInSurah;
      }
      else {
        cde.splitWord = section.text.split(" ");
        cde.totalVersenumber = section.number;
        cde.numberInSurah = section.numberInSurah;
      }

      abc.push(cde);
      count++;
    }

    return abc;
  }

  clickCallback(word: string, ayah: IWord): void {
    console.log("Word clicked: " + word);
    console.log("Total Verse number clicked: " + ayah.totalVersenumber);
    console.log("Number in surah clicked: " + ayah.numberInSurah);
  }
}
