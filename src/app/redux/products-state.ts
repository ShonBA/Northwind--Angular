import { createStore } from "redux";
import ProductModel from "../models/product-model";

export class ProductsState {
    public products: ProductModel[] = [];
};

export enum ProductActionTypes {
    SetProducts = "SetProducts",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct",
    DeleteProduct = "DeleteProduct",
    ClearAll = "ClearAll",
}

export interface ProductsAction {
    type: ProductActionTypes;
    payload?: any;
}

function productsReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState {

    const newState = { ...currentState }

    switch (action.type) {
        case ProductActionTypes.SetProducts:
            newState.products = action.payload;
            break;
        case ProductActionTypes.AddProduct:
            newState.products.push(action.payload);
            break;
        case ProductActionTypes.UpdateProduct:
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id);
            newState.products.splice(indexToUpdate, 1, action.payload);
            break;
        case ProductActionTypes.DeleteProduct:
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload);
            newState.products.splice(indexToDelete, 1)
            break;
        case ProductActionTypes.ClearAll:
            newState.products = [];
            break;
    }

    return newState
}

export const productsStore = createStore(productsReducer);