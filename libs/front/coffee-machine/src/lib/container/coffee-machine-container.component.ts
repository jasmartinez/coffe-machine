import { Component } from '@angular/core';
import { CoffeeMachineFacadeService } from '../+state/coffee-machine-state-facade';

@Component({
  selector: 'coffee-machine-container',
  templateUrl: 'coffee-machine-container.component.html',
  styleUrls:['coffee-machine-container.component.scss']
})

export class CoffeeMachineContainerComponent {
  constructor(private readonly coffeeMachineFacadeService:CoffeeMachineFacadeService) { 
    this.coffeeMachineFacadeService.loadEntries();
  }
}