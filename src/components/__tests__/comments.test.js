import commentsReducer from "reducers/comments";
import { SAVE_COMMENT } from "actions/types";

it("handles actions of type SAVE_COMMENT", () => {
  // Create new action to pass to commentsReducer
  const action = {
    type: SAVE_COMMENT,
    payload: "New comment"
  };

  const newState = commentsReducer([], action);

  expect(newState).toEqual(["New comment"]);
});

it("handles action with unknown type", () => {
  // In this case, since there's no type, it's the same
  // as having an unknown type.
  // This test is sorta optional, not specially useful.
  const newState = commentsReducer([], {});
  expect(newState).toEqual([]);
});
