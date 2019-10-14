import React from "react";
import { shallow } from "enzyme";

// these import paths are only possible because of the
// jsconfig file in the root directory.
import App from "components/App";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";

// Each test gets one it function
// it(description_of_the_test, function_with_test_logic)
// it refers to whatever the name of the file is
// in this case, it = App

// expectations are, along with it function, the core of testing,
// each test should have one or two expectations (though you could theore
// tically have an infinite amount of them). The methods passed to expectations
// are called matchers.

// beforeEach lets you do some _before each_ test inside the file.
// Consider function scoping when using beforeEach and the test function
// in general. Thus:
let wrapped;
beforeEach(() => {
  wrapped = shallow(<App />);
});

it("shows a Comment Box component", () => {
  // One way to do it would be like this
  // const div = document.createElement("div");
  // creates App component inside div
  // ReactDOM.render(<App />, div);

  // Looks inside div
  // check to see if the CommentBox is in there
  // for instance:
  //
  // -----expect(div.innerHTML).toContain("Comment Box");------
  //
  // but the line above is an example for a bad test since, if I change
  // the behavior of the CommentBox component, which is completely unrelated
  // to the App component, to for instance, display This Is The Comment Box
  // the test would break, since it knows about the internal workings of
  // that component.
  //
  // A better test would look like:
  //
  // ------expect(div).toHaveAnInstanceOf(CommentBox);------
  //
  // But, this method does not exist :(

  // Clean-up -> removes the created component
  // this way we avoid performance issues by not having the
  // component around doing nothing while other tests are run
  // ReactDOM.unmountComponentAtNode(div);

  /******************/

  // If we want to do something similar to l37 we can use Enzyme
  // a testing library from Airbnb.
  // This is the implementation:

  // First, look inside App to find a CommentBox. It returns an array.
  // Since we expect there to be a single CommentBox, we use the .length
  // and then test it with the matcher .toEqual(1)
  expect(wrapped.find(CommentBox).length).toEqual(1);
  // Keep in mind that the shallow function will put placeholders for
  // React components inside the main component, so the assertion is that
  // the placeholder is there.

  // IMPORTANT: If the test passes (or before running what should be
  // a correct test), write a version which you expect not to pass.
  // This way you can assert whether or not you had a false positive.
  // i.e. expect(wrapped.find(CommentBox).length).toEqual(9);
});

it("shows a Comment List", () => {
  expect(wrapped.find(CommentList).length).toEqual(1);
});
