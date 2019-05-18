
import * as fromRecipe from '../menu-item/store/food.reduser';
import { ActionReducerMap } from '@ngrx/store';

import { auth } from 'firebase';

export interface AppState{
    foodItem: fromRecipe.State;
    
}

export const reducer:ActionReducerMap<AppState> = {
    foodItem: fromRecipe.foodItemReducer
}

