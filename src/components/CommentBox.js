import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "actions";

const CommentBox = () => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const handleChange = e => {
    setComment(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(actions.saveComment(comment));

    setComment("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Add a Comment</h4>
        <textarea onChange={handleChange} value={comment} />
        <div>
          <button>Submit Comment</button>
        </div>
      </form>
      <button onClick={() => dispatch(actions.fetchComments())}>
        FETCH COMMENTS
      </button>
    </div>
  );
};

export default CommentBox;
