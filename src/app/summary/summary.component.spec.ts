import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { dummySummary } from '../shared/fixtures/dummy';
import { SummaryService } from '../summary.service';
import { Spectator, createComponentFactory, mockProvider } from '@ngneat/spectator'
import { MockComponents } from 'ng-mocks';

import { SummaryComponent } from './summary.component';
import { MonetaryValueComponent } from '../monetary-value/monetary-value.component';
import { ModalComponent } from '../modal/modal.component';

describe('summary component class unit test', () => {
  let spectator: Spectator<SummaryComponent>
  let component: SummaryComponent
  const createComponent = createComponentFactory({
    component: SummaryComponent,
    shallow: true,
    declarations: [
      MockComponents(MonetaryValueComponent, ModalComponent)
    ],
    detectChanges: false,
    providers: [mockProvider(SummaryService)]
  })

  beforeEach(() => {
    
    spectator = createComponent()
    spectator.inject(SummaryService).getSummaryForGivenUser.and.returnValue(of(dummySummary))
    spectator.detectChanges()
    component = spectator.component
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

describe('summary component DOM integration testing', () => {
  let spectator: Spectator<SummaryComponent>
  const createComponent = createComponentFactory({
    component: SummaryComponent,
    shallow: true,
    declarations: [
      MockComponents(MonetaryValueComponent, ModalComponent)
    ],
    detectChanges: false,
    providers: [mockProvider(SummaryService)]
  })

  beforeEach(() => {
    
    spectator = createComponent()
    spectator.inject(SummaryService).getSummaryForGivenUser.and.returnValue(of(dummySummary))
    spectator.detectChanges()
  })

  function clickElement<T extends HTMLElement>(element: T): void {
    element.click()
    spectator.detectChanges()
  }

  function getElementFromSelector<T extends HTMLElement>(selector: string): T {
    return spectator.query(selector) as T
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

  it('should create', () => {
    expect(spectator.element).toBeTruthy()
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