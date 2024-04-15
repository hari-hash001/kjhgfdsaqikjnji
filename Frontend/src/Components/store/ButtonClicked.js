import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isClicked:0
}

export const buttonClicked=createSlice({
    name:'ButtonClicked',
    initialState,
    reducers:{
        click:(state)=>{
            state.isClicked=1;
        }
    }
});
export const {click}=buttonClicked.actions;
export default buttonClicked.reducer;