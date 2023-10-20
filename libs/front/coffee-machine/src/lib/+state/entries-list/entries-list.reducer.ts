import { createReducer, on } from "@ngrx/store";
import { OrderEntry } from "../../models";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as EntriesActions from './entries-list.actions'

export const COFFEE_MACHINE_ENTRIES_LIST = 'entries-list';
export type EntriesState = EntityState<OrderEntry>;
export const adapter: EntityAdapter<OrderEntry> = createEntityAdapter<OrderEntry>({});

const initialState = adapter.getInitialState();

export const getEntriesReducerFn = createReducer(
  initialState,
  on(EntriesActions.addEntries , (state, { entries }) => {
    return  adapter.setAll(entries,state);
  })
);


