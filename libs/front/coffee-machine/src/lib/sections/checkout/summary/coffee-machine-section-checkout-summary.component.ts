import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { OrderSummary } from '../../../models';

@Component({
  selector: 'coffee-machine-checkout-summary',
  templateUrl: './coffee-machine-section-checkout-summary.component.html',
  styleUrls: ['./coffee-machine-section-checkout-summary.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CoffeeMachineSectionCheckoutSummaryComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: OrderSummary,
    private readonly snackBarService: MatSnackBar
    ) {}

    close(){
      this.snackBarService.dismiss();
    }
}
