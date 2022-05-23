import { Component, Input, OnInit } from '@angular/core';
import {SEPMovie} from "../../shared/interfaces/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public imageSrc: string;

  @Input()
  public title: string;

  @Input()
  public year: string;

  @Input()
  public description: string;

  public userMovie: SEPMovie;

  constructor() { }

  ngOnInit(): void {
  }

}
