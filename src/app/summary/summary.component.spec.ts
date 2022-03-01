import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { MonetaryValueComponent } from '../monetary-value/monetary-value.component';
import { dummySummary } from '../shared/test-utils/utils';
import { SummaryService } from '../summary.service';

import { SummaryComponent } from './summary.component';


describe('SummaryComponent class unit test', () => {
  let component: SummaryComponent
  let summaryServiceSpy: jasmine.SpyObj<SummaryService>


  beforeEach(() => {
    const spy = jasmine.createSpyObj('SummaryService', ['getSummaryForGivenUser'])

    TestBed.configureTestingModule({
      providers: [
        SummaryComponent,
        { provide: SummaryService, useValue: spy }
      ]
    })
    component = TestBed.inject(SummaryComponent)
    summaryServiceSpy = TestBed.inject(SummaryService) as jasmine.SpyObj<SummaryService>
    summaryServiceSpy.getSummaryForGivenUser.and.returnValue(of(dummySummary))
    component.ngOnInit()
  })

  it('GivenValidReturnFromServiceShouldInitializeCorrectly', () => {
    expect(component.summary).toEqual(dummySummary)
    expect(component.loading).toBeFalse
  })

  it('GivenSummaryInitializedShouldCalculateCorrectMinifiedTotalBalance', () => {
    component.minifiedTotalBalance()
    expect(component.totalBalance).toEqual(940)
  })

  it('GivenSummaryInitializedShouldCalculateCorrectExpandedTotalBalance', () => {
    component.expandedTotalBalance()
    expect(component.totalBalance).toEqual(1460)
  })

  it('WhenCalledToHidePreviousBalanceShouldChangeCheckedToTrue', () => {
    component.hidePreviousBalance()
    expect(component.checked).toBeFalse()
  })

  it('WhenCalledToHidePreviousBalanceByItsAlreadyHiddenShouldChangeCheckBackToTrue', () => {
    component.hidePreviousBalance()
    component.hidePreviousBalance()
    expect(component.checked).toBeTrue()
  })

})



describe('SummaryComponent', () => {
  let component: SummaryComponent
  let fixture: ComponentFixture<SummaryComponent>
  let componentElement: HTMLElement
  let checkbox: HTMLInputElement
  let previousBalanceElement: HTMLDivElement
  let income: HTMLDivElement
  let expenses: HTMLDivElement
  let totalBalance: HTMLDivElement

  beforeEach(async () => {

    const summaryServiceSpy = jasmine.createSpyObj<SummaryService>('SummaryService', ['getSummaryForGivenUser'])
    summaryServiceSpy.getSummaryForGivenUser.and.returnValue(of(dummySummary))
    
    await TestBed.configureTestingModule({
      declarations: [ SummaryComponent],
      providers: [{provide: SummaryService, useValue: summaryServiceSpy}]
    }).compileComponents()
    
    fixture = TestBed.createComponent(SummaryComponent)
    component = fixture.componentInstance
    componentElement = fixture.nativeElement
    fixture.detectChanges()
    
  })

  const getDivElementFromClass = (clazz: string): HTMLDivElement => {
    return componentElement.querySelector(clazz) as HTMLDivElement
  }

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('GivenDummarySummaryShouldRenderAllDivsCorrectly', () => {
    income = getDivElementFromClass('.income')
    expenses = getDivElementFromClass('.expenses')
    totalBalance = getDivElementFromClass('.total-balance')
    expect(income).toBeTruthy()
    expect(expenses).toBeTruthy()
    expect(totalBalance).toBeTruthy()
  })

  it('GivenDummySummaryShouldRenderValuesCorrectlyIncludingPreviousBalance', () => {
    checkbox = componentElement.querySelector('#include-checkbox') as HTMLInputElement
    previousBalanceElement = getDivElementFromClass('.previous-balance')
    expect(previousBalanceElement).toBeTruthy()
    expect(checkbox.checked).toBeTruthy()
  })

  it('IfHidePreviousBalanceCheckboxClickedThenPreviousBalanceShouldBeHidden', () => {
    checkbox = componentElement.querySelector('#include-checkbox') as HTMLInputElement
    checkbox.click()
    fixture.detectChanges()
    previousBalanceElement = getDivElementFromClass('.previous-balance')
    expect(previousBalanceElement).toBeFalsy()
  })

})
