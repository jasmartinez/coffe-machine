import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { CoffeeMachineFacadeService } from '../../+state/coffee-machine-state-facade';
import { OrderEntry, OrderEntryTypeEnum } from '../../models';

@Component({
  selector: 'coffee-machine-section-types',
  templateUrl: 'coffee-machine-section-types.component.html',
  styleUrls:['./coffee-machine-section-types.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None
})

export class CoffeeMachineSectionTypesComponent {
  entries$: Observable<OrderEntry[]>;
  constructor(
    private readonly coffeeMachineFacadeService:CoffeeMachineFacadeService
  ) { 
    this.entries$ = this.coffeeMachineFacadeService.getEntriesFilteredByType(OrderEntryTypeEnum.CoffeeType);
  }

  updateSelection(id:string){
    this.coffeeMachineFacadeService.updateSingleSelection(OrderEntryTypeEnum.CoffeeType,id);
  }
}