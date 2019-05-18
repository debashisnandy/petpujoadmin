import { FoodItem } from "src/app/main-pages/shared/food.module";
import * as MenuAction from './food.action';

export interface State{
    foods:FoodItem[];
}

const initialState:State ={ 
    
    foods: []
}
export function foodItemReducer(state =initialState ,action:MenuAction.MenuAction){
    
    switch(action.type){
        case MenuAction.ADD_RECIPE:
            return{
                ...state,
                foods: action.payload
            }
        case MenuAction.SET_RECIPE:
            return{
                ...state,
                foods: [...state.foods,action.payload]
            }
        case MenuAction.MODIFY_RECIPE:
            const menuItem = state.foods[action.payload.index];
            const updateItem = {
                ...menuItem,
                ...action.payload.item
            }
            const menuItems = [...state.foods];
            menuItems[action.payload.index] = updateItem;
            
            return{
                ...state,
                foods: menuItems
            }
        case MenuAction.DELETE_RECIPE:
            console.log(action.payload);
        
            const delMenuItems = [...state.foods];
            delMenuItems.splice(action.payload,1);
            return{
                ...state,
                foods: delMenuItems
            }
        default:
        return state;
    }
    
    
}