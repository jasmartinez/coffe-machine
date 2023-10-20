import { createFeatureSelector, createSelector } from "@ngrx/store";
import { COFFEE_MACHINE_FEATURE, CoffeeMachineState } from "..";
import { COFFEE_MACHINE_ENTRIES_LIST, adapter } from "./entries-list.reducer";
import { OrderEntryTypeEnum } from "../../models";


export const selectCoffeeMachineState = createFeatureSelector<CoffeeMachineState>(COFFEE_MACHINE_FEATURE)
export const selectCoffeeMachineEntriesState = createSelector(selectCoffeeMachineState,(state)=> state[COFFEE_MACHINE_ENTRIES_LIST]);
export const selectCoffeeMachineEntries = createSelector(selectCoffeeMachineEntriesState,(state)=> adapter.getSelectors().selectAll(state) || []);
export const selectCoffeeMachineEntriesByType = (type:OrderEntryTypeEnum) => createSelector(selectCoffeeMachineEntries,(state)=>  state.filter((entry)=> entry.type === type));
export const selectCoffeeMachineEntryById = (id:string) => createSelector(selectCoffeeMachineEntriesState,(state)=>  adapter.getSelectors().selectEntities(state)[id] || null);



