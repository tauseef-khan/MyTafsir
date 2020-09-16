import { Component, OnInit } from '@angular/core';
import { SurahService } from '../surah.service';
import { ISurah } from '../surah';

@Component({
  selector: 'app-surah-lines',
  templateUrl: './surah-lines.component.html',
  styleUrls: ['./surah-lines.component.css']
})

export class SurahLinesComponent implements OnInit {

  surah: ISurah;
  ayahs: string[];
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

  breakdownSurah(surah:ISurah): string[] {

    //console.log('Surah: ' + surah.data[0].ayahs);
    let abc: string[] = [];
    let bismillah: string = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

    //'count' is to allow the removal of Bismillah from the first verse in each surah
    let count: number = 0;

    for(var section of surah.data[0].ayahs) {

      if(section.text.includes(bismillah) && count == 0){
        abc.push(section.text.replace(bismillah, "").split(" "));
      }
      else {
        abc.push(section.text.split(" "));
      }

      count++;
      //console.log("Ayah: " + section.text);
    }

    return abc;
  }
}
