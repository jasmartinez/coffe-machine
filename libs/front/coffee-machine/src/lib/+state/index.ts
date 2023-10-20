import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import {
  COFFEE_MACHINE_ENTRIES_LIST,
  EntriesState,
  getEntriesReducerFn,
} from './entries-list/entries-list.reducer';
import {
  OrderEntriesState,
  getOrderEntriesReducerFn,
} from './order-list/order-list.reducer';

export const COFFEE_MACHINE_FEATURE = 'coffee-machine';
export const COFFEE_MACHINE_ORDER_LIST = 'order-list';

export interface CoffeeMachineState {
  [COFFEE_MACHINE_ENTRIES_LIST]: EntriesState;
  [COFFEE_MACHINE_ORDER_LIST]: OrderEntriesState;
}

export const COFFEE_MACHINE_FEATURE_TOKEN = new InjectionToken<
  ActionReducerMap<CoffeeMachineState>
>('Coffee Machine Token');
export const getCoffeeMachineReducers = () => ({
  [COFFEE_MACHINE_ENTRIES_LIST]: getEntriesReducerFn,
  [COFFEE_MACHINE_ORDER_LIST]: getOrderEntriesReducerFn,
});

export const COFFEE_MACHINE_PROVIDER: Provider = {
  provide: COFFEE_MACHINE_FEATURE_TOKEN,
  useFactory: getCoffeeMachineReducers,
};
