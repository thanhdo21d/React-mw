import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { DataChart } from "./interface/data_tablepopup";

interface DataInitialState {
  isLoading: boolean;
  dataChartOption: (string | number)[];
  status: string;
}
const initialState: DataInitialState = {
  isLoading: false,
  dataChartOption: [],
  status: "loading",
};
export const fetchChartOptionAsync = createAsyncThunk<[], DataChart>(
  "chartOptions",
  async (data) => {
    try {
      const response = await agent.dataTableBasic.postFormData({
        action: data.action,
        symbol: data.symbol,
      });
      console.log("daresponseta", response);
      return response.data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
export const fetchChartOptiongwHistoryAsync = createAsyncThunk<[], any>(
  "chartOptions",
  async (data) => {
    try {
      const response = await agent.dataTableBasic.postFormData({
        action: "gw_history",
        symbol: data.stockCode,
      });
      return response.data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
const chartOptionSlice = createSlice({
  name: "ChartOption",
  initialState,
  reducers: {
    setStatusTable: (state, action: PayloadAction<[]>) => {
      state.dataChartOption = action.payload;
    },
    setAction: (state, action: PayloadAction<[]>) => {
      // console.log(ac);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChartOptionAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchChartOptionAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.dataChartOption = action.payload;
        // const result = action.payload;
        // console.log(result)
      });
  },
});

export const { setStatusTable, setAction } = chartOptionSlice.actions;
export default chartOptionSlice;
