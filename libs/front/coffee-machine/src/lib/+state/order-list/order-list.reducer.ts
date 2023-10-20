import { createReducer, on } from '@ngrx/store';
import { OrderEntry } from '../../models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as OrderActions from './order-list.actions';

export const COFFEE_MACHINE_ORDER_LIST = 'order-list';

export type OrderEntriesState = EntityState<OrderEntry> & {
  credit: number;
};

export const adapter: EntityAdapter<OrderEntry> =
  createEntityAdapter<OrderEntry>();

const initialState = adapter.getInitialState({
  credit: 0,
});

export const getOrderEntriesReducerFn = createReducer(
  initialState,
  on(OrderActions.addOrderEntry, (state, { entry }) => {
    return adapter.addOne(entry, state);
  }),
  on(OrderActions.removeOrderEntry, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(OrderActions.updateOrderEntry, (state, { entry }) => {
    return adapter.upsertOne(entry, state);
  }),
  on(OrderActions.addCredit, (state, { credit }) => {
    return {
      ...state,
      credit: state.credit + credit,
    };
  }),
  on(OrderActions.subtractCredit, (state, { credit }) => {
    return {
      ...state,
      credit: state.credit - credit,
    };
  }),
  on(OrderActions.resetOrder, (state) => {
    return adapter.removeAll({ ...state, credit: 0 });
  })
);
