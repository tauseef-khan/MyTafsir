import { Component, OnInit } from '@angular/core';
import { Word } from '../word';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ayah: Word;
  word: string;
  editMode: boolean;

  ngOnInit(): void {
  }

  receiveMessage($event) {
    this.ayah = $event.ayah; 
    this.word = $event.section;
    this.editMode = $event.editMode;
  }

}
