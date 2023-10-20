import { Injectable } from '@angular/core';
import { CoffeeMachineState } from '.';
import { Store } from '@ngrx/store';
import * as EntriesActions from './entries-list/entries-list.actions';
import * as EntriesSelectors from './entries-list/entries-list.selectors';
import * as OrderEntriesActions from './order-list/order-list.actions';
import * as OrderEntriesSelectors from './order-list/order-list.selectors';
import { Observable, take } from 'rxjs';
import { OrderEntry, OrderEntryTypeEnum } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CoffeeMachineFacadeService {
  constructor(
    private readonly store: Store<CoffeeMachineState>,
    private readonly httpService: HttpClient
  ) {}

  // STREAMS 
  entries$ = this.store.select(
    EntriesSelectors.selectCoffeeMachineEntriesState
  );
  orderEntries$ = this.store.select(
    OrderEntriesSelectors.selectCoffeeMachineOrderEntries
  );
  orderEntriesTotal$ = this.store.select(
    OrderEntriesSelectors.selectCoffeeMachineOrderEntriesTotal
  );
  orderEntriesCredit$ = this.store.select(
    OrderEntriesSelectors.selectCoffeeMachineCredit
  );
  orderDisabled$ = this.store.select(
    OrderEntriesSelectors.isOrderDisabled
  );
  orderRefund$ = this.store.select(
    OrderEntriesSelectors.selectCoffeeMachineRefund
  )

  // ENTRIES

  loadEntries() {
    this.httpService
      .get('assets/json/data.json')
      .pipe(take(1))
      .subscribe((data) => {
        this.store.dispatch(
          EntriesActions.addEntries({
            entries: data as unknown as OrderEntry[],
          })
        );
      });
  }

  getEntries() {
    return this._getSnapshot(this.entries$);
  }

  getEntriesFilteredByType(type: OrderEntryTypeEnum) {
    return this.store.select(
      EntriesSelectors.selectCoffeeMachineEntriesByType(type)
    );
  }

  getEntriesFilteredByTypeSnapshot(type: OrderEntryTypeEnum) {
    return this._getSnapshot(this.getEntriesFilteredByType(type));
  }

  getEntryById(id: string) {
    return this.store.select(EntriesSelectors.selectCoffeeMachineEntryById(id));
  }

  getEntryByIdSnapshot(id: string) {
    return this._getSnapshot(this.getEntryById(id));
  }

  // ORDER

  getOrder() {
    return this._getSnapshot(this.orderEntries$);
  }

  getOrderEntriesFilteredByType(type: OrderEntryTypeEnum) {
    return this.store.select(
      OrderEntriesSelectors.selectCoffeeMachineOrderEntriesByType(type)
    );
  }

  getOrderEntriesFilteredByTypeSnapshot(type: OrderEntryTypeEnum) {
    return this._getSnapshot(this.getOrderEntriesFilteredByType(type));
  }

  getOrderEntryById(id: string) {
    return this.store.select(
      OrderEntriesSelectors.selectCoffeeMachineOrderEntriesById(id)
    );
  }

  getOrderEntryByIdSnapshot(id: string) {
    return this._getSnapshot(this.getOrderEntryById(id));
  }

  updateSingleSelection(type: OrderEntryTypeEnum, id: string) {
    // Check if current entry is selected
    const orderTypeId = this.getOrderEntryByIdSnapshot(id);
    if (orderTypeId) {
      this._removeOrderEntry(id);
      return;
    }
    // Remove older
    const ordersType = this.getOrderEntriesFilteredByTypeSnapshot(type);
    if (ordersType && ordersType.length > 0) {
      this._removeOrderEntry(ordersType[0].id);
    }
    // Add new
    const entry = this.getEntryByIdSnapshot(id) || null;
    const selectedEntry = entry ? { ...entry, units: 1, selected: true } : null;
    this._addOrderEntry(selectedEntry);
  }

  isEntryIdSelected(id: string) {
    return this.store.select(
      OrderEntriesSelectors.isSelectedOrderEntryById(id)
    );
  }

  updateMultipleSelectionIncrement(id: string) {
    // Check if current entry is selected
    const orderTypeId = this.getOrderEntryByIdSnapshot(id);
    let entry: OrderEntry | null;
    let selectedEntry: OrderEntry | null;

    if (!orderTypeId) {
      entry = this.getEntryByIdSnapshot(id) || null;
      selectedEntry = entry ? { ...entry, selected: true, units: 1 } : null;
    } else {
      selectedEntry = {
        ...orderTypeId,
        selected: true,
        units: orderTypeId.units + 1,
      };
    }
    this.store.dispatch(
      OrderEntriesActions.updateOrderEntry({
        entry: selectedEntry as OrderEntry,
      })
    );
  }

  updateMultipleSelectionDecrement(id: string) {
    const orderTypeId = this.getOrderEntryByIdSnapshot(id);
    let selectedEntry: OrderEntry | null;
    if (!orderTypeId) {
      return;
    } else {
      selectedEntry = {
        ...orderTypeId,
        units: orderTypeId.units - 1,
      };
    }
    if (selectedEntry.units === 0) {
      this._removeOrderEntry(selectedEntry.id);
    } else {
      this.store.dispatch(
        OrderEntriesActions.updateOrderEntry({
          entry: selectedEntry,
        })
      );
    }
  }

  unitsSelectedByEntryId(id:string){
    return this.store.select(OrderEntriesSelectors.unitsSelectedByEntryId(id))
  }

  getTotalSnapshot(){
    return this._getSnapshot(this.orderEntriesTotal$);
  }

  // CREDIT

  addCredit(credit:number){
    this.store.dispatch(OrderEntriesActions.addCredit({credit}))
  }

  subtractCredit(credit:number){
    this.store.dispatch(OrderEntriesActions.subtractCredit({credit}))
  }

  reset(){
    this.store.dispatch(OrderEntriesActions.resetOrder());
  }

  getRefundSnapshot(){
    return this._getSnapshot(this.orderRefund$);
  }

  getCreditSnapshot(){
    return this._getSnapshot(this.orderEntriesCredit$);
  }

  private _addOrderEntry(entry: OrderEntry | null) {
    if (entry) {
      this.store.dispatch(OrderEntriesActions.addOrderEntry({ entry }));
    }
  }

  private _removeOrderEntry(id: string) {
    this.store.dispatch(OrderEntriesActions.removeOrderEntry({ id }));
  }

  private _getSnapshot<T>(stream$: Observable<T>): T | null {
    let response: T | null = null;
    stream$.pipe(take(1)).subscribe((data) => {
      response = data;
    });
    return response;
  }
}
