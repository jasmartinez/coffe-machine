
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { COFFEE_MACHINE_FEATURE, CoffeeMachineState } from "..";
import { COFFEE_MACHINE_ORDER_LIST, adapter } from "./order-list.reducer";
import { OrderEntryTypeEnum } from "../../models";


export const selectCoffeeMachineState = createFeatureSelector<CoffeeMachineState>(COFFEE_MACHINE_FEATURE)
export const selectCoffeeMachineOrderState = createSelector(selectCoffeeMachineState,(state)=> state[COFFEE_MACHINE_ORDER_LIST]);
export const selectCoffeeMachineCredit= createSelector(selectCoffeeMachineOrderState,(state)=> state.credit);
export const selectCoffeeMachineOrderEntries = createSelector(selectCoffeeMachineOrderState,(state)=> adapter.getSelectors().selectAll(state) || []);
export const selectCoffeeMachineOrderEntriesTotal = createSelector(
  selectCoffeeMachineOrderEntries,
  (state) => {
    return state.reduce((acum, entry) => {
      acum = acum + (entry.price * entry.units);
      return acum;
    }, 0);
  }
);
export const selectCoffeeMachineOrderEntriesByType = (type:OrderEntryTypeEnum) => createSelector(selectCoffeeMachineOrderEntries,(state)=>  state.filter((entry)=> entry.type === type));
export const selectCoffeeMachineOrderEntriesById = (id:string)=> createSelector(selectCoffeeMachineOrderState,(state)=> adapter.getSelectors().selectEntities(state)[id] || null);
export const isSelectedOrderEntryById = (id:string) => createSelector(selectCoffeeMachineOrderEntriesById(id),(state)=> state ? true:false);
export const unitsSelectedByEntryId = (id:string) => createSelector(selectCoffeeMachineOrderEntriesById(id),(state)=> state ? state.units:0);
export const isSelectedCoffeeSizeOrder = createSelector(selectCoffeeMachineOrderEntriesByType(OrderEntryTypeEnum.CoffeeSize),(state)=> state.length ? true:false);
export const isSelectedCoffeeTypeOrder = createSelector(selectCoffeeMachineOrderEntriesByType(OrderEntryTypeEnum.CoffeeType),(state)=> state.length ? true:false);
export const isOrderSelectionValid = createSelector(isSelectedCoffeeSizeOrder,isSelectedCoffeeTypeOrder,(size,type)=> size && type);
export const isEnoughCredit = createSelector(selectCoffeeMachineCredit,selectCoffeeMachineOrderEntriesTotal,(credit,total)=> credit >= total);
export const isOrderDisabled = createSelector(isOrderSelectionValid,isEnoughCredit,(selection,credit)=> !(selection && credit));
export const selectCoffeeMachineRefund = createSelector(selectCoffeeMachineCredit,selectCoffeeMachineOrderEntriesTotal,isOrderDisabled,(credit,total,disabled)=> (credit > total) && !disabled ? credit - total : 0)



