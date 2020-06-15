import React from "react";
import { Provider } from "react-redux";
import { store } from '../store';

export const Main = ()=> (
    <Provider store={store}>
        <div>
            Dashboards Goes Here!
        </div>
    </Provider>
)
