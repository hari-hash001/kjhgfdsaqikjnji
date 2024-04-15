import { configureStore } from "@reduxjs/toolkit";
import { buttonClicked } from "./ButtonClicked";
import ButtonClickedReducer from "./ButtonClicked"
export const store=configureStore({
    reducer:{
        buttonClicked: ButtonClickedReducer,
    }
})
