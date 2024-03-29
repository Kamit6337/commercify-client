import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  selectedAddress: null,
};

const addressSlice = createSlice({
  name: "AddressSlice",
  initialState,
  reducers: {
    initialAddressData: (state, { payload }) => {
      const { data } = payload;
      state.addresses = data;
      state.selectedAddress = data[0];
      return state;
    },
    createNewAddress: (state, { payload }) => {
      const { data } = payload;
      state.addresses = [data, ...state];
      return state;
    },
    updateAddressData: (state, { payload }) => {
      const { data } = payload;
      state.addresses = state.addresses.map((address) => {
        if (address._id === data._id) {
          return data;
        }
        return address;
      });
    },
    updateSelectedAddress: (state, { payload }) => {
      const address = payload;
      state.selectedAddress = address;
      return state;
    },
  },
});

export const {
  initialAddressData,
  updateAddressData,
  createNewAddress,
  updateSelectedAddress,
} = addressSlice.actions;

export const addressReducer = addressSlice.reducer;

export const addressState = (state) => state.address;
