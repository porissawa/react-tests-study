import React from "react";
import { mount } from "enzyme";

import CommentBox from "components/CommentBox";

let wrapped;
beforeEach(() => {
  wrapped = mount(<CommentBox />);
});

// Like beforeEach, Jest has another elper called afterEach, which does exactly this
afterEach(() => {
  wrapped.unmount();
});

it("has a text area", () => {
  // Whenever you use Full DOM rendering for tests, it's very important to unmount/write clean-up
  // since it will mount the component in the DOM and, as such, that element, if unmounted, may affect
  // other tests that come after it.

  // As in the App tests, we can use find here to find not an instance of a component but actual HTML
  // elements by using CSS selectors.

  expect(wrapped.find("textarea").length).toEqual(1);
  // console.log(wrapped); -- logs ReactWrapper{}
});

// console.log(wrapped); -- logs undefined

it("has a button", () => {
  // console.log(wrapped); -- logs ReactWrapper{}
  expect(wrapped.find("button").length).toEqual(1);
});

// Now, to test the input functionality on the textarea, there are some steps we must go through:
// 1. Find the textarea
// 2. Simulate a change event
// 3. Provide a fake event object
// 4. Force the component to update
// 5. Assert that the value inside the textarea has changed

it("has a textarea that users can type in", () => {
  // 1 is done with .find
  // 2 uses .simulate(event[, mockObject])
  wrapped.find("textarea").simulate("change", { target: { value: "aaaa" } });
});
