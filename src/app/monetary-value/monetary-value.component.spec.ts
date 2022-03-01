import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryValueComponent } from './monetary-value.component';

describe('MonetaryValueComponent', () => {
  let component: MonetaryValueComponent;
  let fixture: ComponentFixture<MonetaryValueComponent>;
  let componentElement: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonetaryValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonetaryValueComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('GivenRealShouldRenderIt', () => {
    component.currency = 'R$'
    component.value = 1400
    fixture.detectChanges();
    expect(componentElement.textContent).toEqual('R$ 1400')
  })

  it('GivenDollarShouldRenderIt', () => {
    component.currency = '$'
    component.value = 1400
    fixture.detectChanges();
    expect(componentElement.textContent).toEqual('$ 1400')
  })
});
