import { createAction, props } from "@ngrx/store";
import { OrderEntry } from "../../models";

export const addOrderEntry = createAction('[Coffee Machine/Order] AddEntry', props<{ entry: OrderEntry }>());
export const removeOrderEntry = createAction('[Coffee Machine/Order] RemoveEntry', props<{ id: string}>());
export const updateOrderEntry = createAction('[Coffee Machine/Order] UpdateEntry', props<{ entry: OrderEntry }>());
export const addCredit = createAction('[Coffee Machine/Order] Add Credit', props<{ credit: number }>());
export const subtractCredit = createAction('[Coffee Machine/Order] Subtract Credit', props<{ credit: number }>());
export const resetOrder = createAction('[Coffee Machine/Order] Reset Order');



