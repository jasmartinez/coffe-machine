import { createAction, props } from "@ngrx/store";
import { OrderEntry } from "../../models";

export const addEntries = createAction('[Coffee Machine] AddEntries', props<{ entries: OrderEntry[] }>());
