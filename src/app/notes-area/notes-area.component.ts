import { Component, Input, OnInit } from '@angular/core';
import { Word } from '../word';

@Component({
  selector: 'app-notes-area',
  templateUrl: './notes-area.component.html',
  styleUrls: ['./notes-area.component.css']
})

export class NotesAreaComponent implements OnInit {

  @Input() word: string;
  @Input() ayah: Word;
  @Input() editMode: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
