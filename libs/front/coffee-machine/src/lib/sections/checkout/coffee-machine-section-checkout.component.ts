import { ChangeDetectorRef, Component } from '@angular/core';
import { CoffeeMachineFacadeService } from '../../+state/coffee-machine-state-facade';
import { Observable, take } from 'rxjs';
import { OrderEntry, OrderSummary } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoffeeMachineSectionCheckoutSummaryComponent } from './summary/coffee-machine-section-checkout-summary.component';

@Component({
  selector: 'coffee-machine-checkout',
  templateUrl: 'coffee-machine-section-checkout.component.html',
  styleUrls: ['./coffee-machine-section-checkout.component.scss'],
})
export class CoffeeMachineSectionCheckoutComponent {
  orderList$: Observable<OrderEntry[]>;
  total$: Observable<number>;
  orderDisabled$: Observable<boolean>;
  credit$: Observable<number>;
  refund$: Observable<number>;
  disableActions = false;

  constructor(
    private readonly coffeeMachineFacadeService: CoffeeMachineFacadeService,
    private readonly snackBarService: MatSnackBar,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.orderList$ = this.coffeeMachineFacadeService.orderEntries$;
    this.total$ = this.coffeeMachineFacadeService.orderEntriesTotal$;
    this.orderDisabled$ = this.coffeeMachineFacadeService.orderDisabled$;
    this.credit$ = this.coffeeMachineFacadeService.orderEntriesCredit$;
    this.refund$ = this.coffeeMachineFacadeService.orderRefund$;
  }

  addCredit(credit: number) {
    this.coffeeMachineFacadeService.addCredit(credit);
  }

  processOrder() {
    const total = this.coffeeMachineFacadeService.getTotalSnapshot() || 0;
    const order = this.coffeeMachineFacadeService.getOrder() as OrderEntry[];
    const refound = this.coffeeMachineFacadeService.getRefundSnapshot() as number;
    this._showSummary({total,order,refund: refound}).afterDismissed()
    .pipe(take(1))
    .subscribe(() => {
      this.coffeeMachineFacadeService.reset();
      this.disableActions = false;
      this.cdr.detectChanges();
    });
    this.disableActions = true;
    this.cdr.detectChanges();
  }

  private _showSummary(data: OrderSummary) {
    return this.snackBarService.openFromComponent(
      CoffeeMachineSectionCheckoutSummaryComponent,
      {
        data,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'coffee-machine-summary-dialog',
        duration: 4000
      }
    );
  }

  reset() {
    this.disableActions = true;
    this._showSummary({
      order:[],
      total:0,
      refund:this.coffeeMachineFacadeService.getCreditSnapshot() as number
    }).afterDismissed()
      .pipe(take(1))
      .subscribe(() => {
        this.disableActions = false;
        this.cdr.detectChanges();
      });
    this.coffeeMachineFacadeService.reset();
    this.cdr.detectChanges();
  }
}