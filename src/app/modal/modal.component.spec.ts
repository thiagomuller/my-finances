import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('modal component unit tests', () => {
  let component: ModalComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ModalComponent ]
    })
    component = TestBed.inject(ModalComponent)
  })

  it('given show modal as false initially then toggled should be true', () => {
    component.showModal = true
    component.toggleModal()
    expect(component.showModal).toBeFalse()
  })

  it('given show modal as true initially then toggled should be false', () => {
    component.showModal = false
    component.toggleModal()
    expect(component.showModal).toBeTrue()
  })

  it('should raise togle modal event when question mark clicked', () => {
    component.showModalChange.pipe().subscribe()
  })
})

describe('modal component', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
