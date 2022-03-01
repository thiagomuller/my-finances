import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monetary-value',
  templateUrl: './monetary-value.component.html',
  styleUrls: ['./monetary-value.component.scss']
})
export class MonetaryValueComponent  {

  @Input()
  currency: string

  @Input()
  value: number
}