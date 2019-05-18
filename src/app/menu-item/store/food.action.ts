import { Action } from '@ngrx/store';
import { FoodItem } from '../../main-pages/shared/food.module';


export const SET_RECIPE = "SET_RECIPE";
export const ADD_RECIPE = "ADD_RECIPE";
export const MODIFY_RECIPE = "MODIFY_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

export class AddMenu implements Action{
    readonly type = ADD_RECIPE;
    constructor(public payload:FoodItem[]){}
}

export class SetMenu implements Action{
    readonly type = SET_RECIPE;
    constructor(public payload:FoodItem){}
}

export class ModifyMenu implements Action{
    readonly type = MODIFY_RECIPE;
    constructor(public payload:{index:number,item:FoodItem}){}
}

export class DeleteMenu implements Action{
    readonly type = DELETE_RECIPE;
    constructor(public payload:number){}
}

export type MenuAction = SetMenu |
                        ModifyMenu |
                        DeleteMenu | 
                        AddMenu;