import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';

const Comment = ( { comment }) => {
  const d = new Date(comment.updatedAt);
  const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>{date}</span>
        <span className={styles.postCommentLikes}>{comment.likes.length} likes</span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};


Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default Comment;