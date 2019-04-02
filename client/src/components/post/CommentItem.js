import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';
import Moment from 'react-moment';

class CommentItem extends Component {

    onDeleteItem(id, commentId){
        this.props.deleteComment(id, commentId);
    }
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="comments">
        <div className="card card-body">
            <div className="row">
                <div className="col-md-1">
                    <img src={comment.avatar} alt={comment.name} className="rounded-circle"/>
                    <br/>
                    <p className="text-center m-0">{comment.name}</p>
                </div>
                <div className="col-md-10 pt-1 pb-1">
                    <p className="lead mb-0">{comment.text}</p>
                    <small><span className="badge badge-secondary p-1 mb-1"><Moment fromNow>{comment.date}</Moment></span></small>
                    <br/>
                    {comment.user === auth.user.id ? (
                        <button onClick={this.onDeleteItem.bind(this, postId, comment._id)} className="btn btn-secondary btn-sm">
                            Delete comment
                        </button>
                    ) : null }
                </div>
            </div>
        </div>
      </div>
    )
  }
}
CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem);