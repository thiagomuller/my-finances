import { Summary } from '../shared/model/summary';
import { Component, Input, OnInit} from '@angular/core';
import { SummaryService } from '../summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit{

  @Input()
  userId: number
  summary: Summary
  totalBalance: number
  checked: boolean = true
  loading: boolean = true

  constructor(private summaryService:SummaryService){}

  ngOnInit(): void {
    this.summaryService.getSummaryForGivenUser(this.userId).subscribe((summary) => {
      this.summary = summary
      this.totalBalance = (this.summary.previousBalance + this.summary.income) - this.summary.expenses
      this.loading = false
    })
  }
  
  minifiedTotalBalance: () => void = function() {
    this.totalBalance = this.summary.income - this.summary.expenses
  }

  expandedTotalBalance: () => void = function() {
    this.totalBalance = (this.summary.previousBalance + this.summary.income) - this.summary.expenses
  }

  hidePreviousBalance: () => void = function() {
    if(this.checked) {
      this.checked = false
      this.minifiedTotalBalance()
      return
    }
    this.expandedTotalBalance()
    this.checked = true
  }

  
}