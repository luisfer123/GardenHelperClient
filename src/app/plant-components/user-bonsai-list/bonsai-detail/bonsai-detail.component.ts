import { Component, Input, OnInit } from '@angular/core';
import { Bonsai } from 'src/app/_model/Bonsai';

@Component({
  selector: 'app-bonsai-detail',
  templateUrl: './bonsai-detail.component.html',
  styleUrls: ['./bonsai-detail.component.css']
})
export class BonsaiDetailComponent implements OnInit {

  @Input() 
  bonsai: Bonsai | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
