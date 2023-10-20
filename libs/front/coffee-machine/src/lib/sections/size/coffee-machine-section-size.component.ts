import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CoffeeMachineFacadeService } from '../../+state/coffee-machine-state-facade';
import { Observable } from 'rxjs';
import { OrderEntry, OrderEntryTypeEnum } from '../../models';

@Component({
  selector: 'coffee-machine-section-size',
  templateUrl: 'coffee-machine-section-size.component.html',
  styleUrls: ['./coffee-machine-section-size.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None
})

export class CoffeeMachineSectionSizeComponent {
  entries$: Observable<OrderEntry[]>;
  constructor(
    private readonly coffeeMachineFacadeService:CoffeeMachineFacadeService
  ) { 
    this.entries$ = this.coffeeMachineFacadeService.getEntriesFilteredByType(OrderEntryTypeEnum.CoffeeSize);
  }

  updateSelection(id:string){
    this.coffeeMachineFacadeService.updateSingleSelection(OrderEntryTypeEnum.CoffeeSize,id);
  }
}