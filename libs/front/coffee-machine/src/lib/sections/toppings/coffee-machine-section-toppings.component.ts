import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { CoffeeMachineFacadeService } from '../../+state/coffee-machine-state-facade';
import { OrderEntry, OrderEntryTypeEnum } from '../../models';

@Component({
  selector: 'coffee-machine-section-toppings',
  templateUrl: 'coffee-machine-section-toppings.component.html',
  styleUrls: ['./coffee-machine-section-toppings.component.scss'],
  encapsulation:ViewEncapsulation.None,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CoffeeMachineSectionToppingsComponent {
  entries$: Observable<OrderEntry[]>;
  constructor(
    private readonly coffeeMachineFacadeService: CoffeeMachineFacadeService
  ) {
    this.entries$ = this.coffeeMachineFacadeService.getEntriesFilteredByType(
      OrderEntryTypeEnum.CoffeeTopping
    );
  }

  updateSelection($event: { id: string; increment: boolean }) {
    if ($event.increment === true) {
      this._updateSelectionIncrement($event.id);
    } else {
      this._updateSelectionDecrement($event.id);
    }
  }

  private _updateSelectionIncrement(id: string) {
    this.coffeeMachineFacadeService.updateMultipleSelectionIncrement(id);
  }

  private _updateSelectionDecrement(id: string) {
    this.coffeeMachineFacadeService.updateMultipleSelectionDecrement(id);
  }
}
