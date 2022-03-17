import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { dummySummary } from '../shared/fixtures/dummy';
import { SummaryService } from '../summary.service';

import { SummaryComponent } from './summary.component';


describe('summary component class unit test', () => {
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

  it('given valid return from service should initialize correctly', () => {
    expect(component.summary).toEqual(dummySummary)
    expect(component.loading).toBeFalse
  })

  it('given summary initialized should calculate correct minified total balance', () => {
    component.minifiedTotalBalance()
    expect(component.totalBalance).toEqual(940)
  })

  it('given summary initialized should calculate correct expanded total balance', () => {
    component.expandedTotalBalance()
    expect(component.totalBalance).toEqual(1460)
  })

  it('when called to hide previous balance should change checked to true', () => {
    component.hidePreviousBalance()
    expect(component.showPreviousBalance).toBeFalse()
  })

  it('when called to hide previous balance by its already hidden should change check back to true', () => {
    component.hidePreviousBalance()
    component.hidePreviousBalance()
    expect(component.showPreviousBalance).toBeTrue()
  })

})


describe('summary component template integrations tests', () => {
  let component: SummaryComponent
  let fixture: ComponentFixture<SummaryComponent>
  let componentElement: HTMLElement

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

  function getElementFromSelector<T extends HTMLElement>(selector: string): T {
    return componentElement.querySelector(selector) as T
  }

  type ComponentHTMLElements = {
    income: HTMLDivElement,
    expenses: HTMLDivElement,
    totalBalance: HTMLDivElement,
    previousBalance?: HTMLDivElement,
    checkbox?: HTMLInputElement
  }

  const getComponentHTMLElements: () => ComponentHTMLElements = () => {
    return {
      income: getElementFromSelector<HTMLDivElement>('.income'),
      expenses: getElementFromSelector<HTMLDivElement>('.expenses'),
      totalBalance: getElementFromSelector<HTMLDivElement>('.total-balance'),
      previousBalance: getElementFromSelector<HTMLDivElement>('.previous-balance'),
      checkbox: getElementFromSelector<HTMLInputElement>('#include-checkbox')
    }
  }

  function clickElement<T extends HTMLElement>(element: T): void {
    element.click()
    fixture.detectChanges()
  }

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('given dummy summary should render all divs correctly', () => {
    let monetaryValues = getComponentHTMLElements()
    expect(monetaryValues.income).toBeTruthy()
    expect(monetaryValues.expenses).toBeTruthy()
    expect(monetaryValues.totalBalance).toBeTruthy()
  })

  it('given dummy summary should render values correctly icluding previous balance', () => {
    const componentElements = getComponentHTMLElements()
    expect(componentElements.previousBalance).toBeTruthy()
    expect(componentElements.checkbox.checked).toBeTruthy()
  })

  it('if hide previous balance checkbox clicked then previous balance should be hidden', () => {
    const componentElements = getComponentHTMLElements()
    clickElement(componentElements.checkbox)
    expect(getElementFromSelector<HTMLDivElement>('.previous-balance')).toBeFalsy()
  })

  const expectValuePresentAndCorrect: (element: HTMLDivElement, expectedValue: string) => void = (element, expectedValue) => {
    expect(element).toBeTruthy()
    expect(element.textContent).toEqual(expectedValue)
  }

  const retrieveMinifyBtnAndClickIt = () => {
    const btn = getElementFromSelector<HTMLButtonElement>('.minify-summary-btn')
    clickElement(btn)
  }

  it('if minify summary btn is clicked then should minify it maintaining same state', () => {
    const componentElements = getComponentHTMLElements()
    expectValuePresentAndCorrect(componentElements.expenses, 'Saidas')
    expectValuePresentAndCorrect(componentElements.income, 'Entradas')
    expectValuePresentAndCorrect(componentElements.previousBalance, 'Saldo anterior')
    retrieveMinifyBtnAndClickIt()
    expect(getElementFromSelector<HTMLDivElement>('summary-body')).toBeFalsy()
  })

  it('if summary minified then minify btn is clicked again should render component back', () => {
    retrieveMinifyBtnAndClickIt()
    retrieveMinifyBtnAndClickIt()
    const componentElements = getComponentHTMLElements()
    expect(getElementFromSelector<HTMLDivElement>('.summary-body')).toBeTruthy()
    expect(componentElements.checkbox.checked).toBeTruthy()
    expect(componentElements.expenses.textContent).toEqual('Saidas')
    expect(componentElements.income.textContent).toEqual('Entradas')
    expectValuePresentAndCorrect(componentElements.previousBalance, 'Saldo anterior')
  })

  it('when minimize summary btn clicked its text should change to a plus sign', () => {
    retrieveMinifyBtnAndClickIt()
    const btn = getElementFromSelector<HTMLButtonElement>('.minify-summary-btn')
    expect(btn.textContent).toEqual('+')
  })

  it('when expand summary btn clicked its text should change back to a minus sign', () => {
    retrieveMinifyBtnAndClickIt()
    retrieveMinifyBtnAndClickIt()
    const btn = getElementFromSelector<HTMLButtonElement>('.minify-summary-btn')
    expect(btn.textContent).toEqual('-')
  })

})
