import { createStore } from "redux";
import EmployeeModel from "../models/employee-model";

export class EmployeeState {
    public employees: EmployeeModel[] = [];
};

export enum EmployeesActionTypes {
    SetEmployees = "SetEmployees",
    AddEmployee = "AddEmployee",
    UpdateEmployee = "UpdateEmployee",
    DeleteEmployee = "DeleteEmployee",
    ClearAll = "ClearAll",
}

export interface EmployeesAction {
    type: EmployeesActionTypes;
    payload?: any;
}

function employeesReducer(currentState = new EmployeeState(), action: EmployeesAction): EmployeeState {

    const newState = { ...currentState }

    switch (action.type) {
        case EmployeesActionTypes.SetEmployees:
            newState.employees = action.payload;
            break;
        case EmployeesActionTypes.AddEmployee:
            newState.employees.push(action.payload);
            break;
        case EmployeesActionTypes.UpdateEmployee:
            const indexToUpdate = newState.employees.findIndex(e => e.id === action.payload.id);
            newState.employees.splice(indexToUpdate, 1, action.payload);
            break;
        case EmployeesActionTypes.DeleteEmployee:
            const indexToDelete = newState.employees.findIndex(e => e.id === action.payload);
            newState.employees.splice(indexToDelete, 1)
            break;
        case EmployeesActionTypes.ClearAll:
            newState.employees = [];
            break;
    }

    return newState
}

export const employeesStore = createStore(employeesReducer);