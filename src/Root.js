import React from "react";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";

import { createStore, applyMiddleware } from "redux";
import reducers from "reducers";

// This is what kills the error messages we get when using redux to test single components
// Since they connected to the store through connect()(), when testing this will be unavailable
// because we only mount a single component, without its Provider involved App parent.
// So, to work around this, we can create a function such as setupStore, which takes a
// component as its argument and wraps it in the Provider with the redux store.
// /\ BREAKS WHEN PASSING INITIAL STATE ---- WHYYYYY????? /\

// The second argument we pass to createStore is its initial state. This is so the tests on CommentList.test.js
// don't break, since it needs to assert if it will render one LI for each item on the
// comment key inside our redux store.
//

export const setupStore = (component, initialState = {}) => {
  return (
    <Provider store={createStore(reducers, initialState)}>{component}</Provider>
  );
};

export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(reduxPromise)
  );
  return <Provider store={store}>{children}</Provider>;
};
