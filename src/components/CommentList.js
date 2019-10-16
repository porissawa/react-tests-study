import React from "react";
import { useSelector, connect } from "react-redux";

const CommentList = () => {
  const comments = useSelector(state => state.comments);

  function renderComments() {
    return comments.map((c, i) => {
      return <li key={c.concat(i)}>{c}</li>;
    });
  }

  return (
    <div>
      <ul>{renderComments()}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { comments: state.comments };
};

export default connect(mapStateToProps)(CommentList);
