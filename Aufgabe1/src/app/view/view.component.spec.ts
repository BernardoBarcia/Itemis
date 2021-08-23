import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starting values', () => {
    expect(component.goodList).toBeTruthy();
    expect(component.goodList.length).toBe(10);
  });

  it('starting UI', () => {
    const native = fixture.nativeElement;
    expect(
      native
        .querySelector('.calculatedReceipt')
        ?.classList.contains('invisible')
    ).toBeTrue();
    expect(native.querySelector('.receipt-button')).toBeTruthy();
    expect(native.querySelector('.goods-list')).toBeTruthy();
  });

  it('cannot generate empty receipt', () => {
    component.generateReceipt();
    expect(
      fixture.nativeElement
        .querySelector('.calculatedReceipt')
        ?.classList.contains('invisible')
    ).toBeTrue();
  });

  it('can change product amount and generate receipt', () => {
    component.changeAmount(component.goodList[0], -1);
    expect(component.goodList[0].amount).toBe(0);

    component.changeAmount(component.goodList[0], 1);
    expect(component.goodList[0].amount).toBe(1);

    component.generateReceipt();
    const receipt = fixture.nativeElement.querySelector('.receipt');
    expect(
      fixture.nativeElement
        .querySelector('.calculatedReceipt')
        ?.classList.contains('invisible')
    ).toBeFalse();
    expect(receipt.innerHTML.length).toBeGreaterThan(0);
  });
});
