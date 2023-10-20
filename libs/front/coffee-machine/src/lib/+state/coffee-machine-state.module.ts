import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { COFFEE_MACHINE_FEATURE, COFFEE_MACHINE_FEATURE_TOKEN, COFFEE_MACHINE_PROVIDER } from '.';
import { CoffeeMachineFacadeService } from './coffee-machine-state-facade';


@NgModule({
  imports: [
    StoreModule.forFeature(
      COFFEE_MACHINE_FEATURE,
      COFFEE_MACHINE_FEATURE_TOKEN
    ),
  ],
  exports: [],
  declarations: [],
  providers: [
    COFFEE_MACHINE_PROVIDER,
    CoffeeMachineFacadeService
  ],
})
export class CoffeeMachineFeatureStateModule {}
