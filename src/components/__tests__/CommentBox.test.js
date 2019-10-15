import React from "react";
import { mount } from "enzyme";

import CommentBox from "components/CommentBox";
import { setupStore } from "Root";

// If l7 to l10 are confusing, check App.test.js
let wrapped;
beforeEach(() => {
  wrapped = mount(setupStore(<CommentBox />));
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
  // console.log(wrapped); --> logs ReactWrapper{}
});

// console.log(wrapped); --> logs undefined

it("has a button", () => {
  // console.log(wrapped); --> logs ReactWrapper{}
  expect(wrapped.find("button").length).toEqual(1);
});

// Now, to test the input functionality on the textarea, there are some steps we must go through:
// 1. Find the textarea
// 2. Simulate a change event
// 3. Provide a fake event object
// 4. Force the component to update
// 5. Assert that the value inside the textarea has changed

// The describe construc can be used to group together common behaviour between
// tests. With this, we can scope a before each to a more restricted set of tests.
describe("the text area", () => {
  //and thus, we avoid duplicate
  beforeEach(() => {
    wrapped.find("textarea").simulate("change", { target: { value: "aaaa" } });
    wrapped.update();
  });

  it("accepts user input", () => {
    // 1 is done with .find()
    // 2 uses .simulate(event[, mockObject])
    // Since setState is asynchronous, we manually force the update with .update()
    // Enzyme has a .prop menthod which expects a name.
    // Since we update the state on l48 and the component renders whatever
    // is in there, this is the best way to assert the value inside the
    // textarea.

    expect(wrapped.find("textarea").prop("value")).toEqual("aaaa");
  });

  it("is emptied on submit", () => {
    // Same idea for this test. Since the simulate method will work according
    // to each tags event, we leave the <button> be and instead work with the
    // form tag, since that's the one that has a submit event attached to it.
    // IMPORTANT: Do remember to actually put something on the textarea before
    // checking if its empty.

    wrapped.find("form").simulate("submit");
    wrapped.update();
    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
