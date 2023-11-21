/* eslint-disable react/forbid-foreign-prop-types */
import checkPropTypes from 'check-prop-types';
import { queryByAttribute } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../store/rootReducer';

export const getByTestId = queryByAttribute.bind(null, 'data-testid');

/**
 * @function checkProps
 * @param {*} component
 * @param {*} confirmingProps
 */
export const checkProps = (component, confirmingProps) => {
  const propError = checkPropTypes(component.propTypes, confirmingProps, 'prop', component.name);
  expect(propError).toBeUndefined();
};

/**
 * Create a testing store with imported reducers, middleware and initial state.
 * @function storeFactory
 * @param {object} initialState - Initial state for store.
 * @returns {Store} - Redux store.
 */
export const storeFactory = initialState =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });