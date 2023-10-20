import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeMachineFeatureStateModule } from './+state/coffee-machine-state.module';
import { CoffeeMachineContainerComponent } from './container/coffee-machine-container.component';
import { CoffeeMachineSectionToppingsComponent } from './sections/toppings/coffee-machine-section-toppings.component';
import { CoffeeMachineSectionTypesComponent } from './sections/types/coffee-machine-section-types.component';
import { CoffeeMachineSectionSizeComponent } from './sections/size/coffee-machine-section-size.component';
import { CoffeeMachineSelectorMultipleComponent } from './selectors/multiple/coffee-machine-selector-multiple.component';
import { CoffeeMachineSelectorSingleComponent } from './selectors/single/coffee-machine-selector-single.component';
import { LibsFrontSharedMaterialModule } from '@coffee/libs-front-shared-material';
import { CoffeeMachineSectionCheckoutComponent } from './sections/checkout/coffee-machine-section-checkout.component';
import { CoffeeMachineSectionCheckoutSummaryComponent } from './sections/checkout/summary/coffee-machine-section-checkout-summary.component';

@NgModule({
  imports: [CommonModule, CoffeeMachineFeatureStateModule,LibsFrontSharedMaterialModule],
  declarations:[
    CoffeeMachineContainerComponent,
    CoffeeMachineSectionToppingsComponent,
    CoffeeMachineSectionTypesComponent,
    CoffeeMachineSectionSizeComponent,
    CoffeeMachineSelectorMultipleComponent,
    CoffeeMachineSelectorSingleComponent,
    CoffeeMachineSectionCheckoutComponent,
    CoffeeMachineSectionCheckoutSummaryComponent
  ],
  exports:[
    CoffeeMachineContainerComponent
  ]
})
export class LibsFrontCoffeeMachineModule {}
