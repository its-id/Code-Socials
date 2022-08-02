import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import { toggleLike } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comment = ( { comment }) => {
  const d = new Date(comment.updatedAt);
  const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

  const handleCommentLikeClick = async () => {

    const response = await toggleLike(comment._id, 'Comment');

    if(response.success){

        //means, we removed the like
        if(response.data.deleted){
            toast.success('Removed Like Successfully!', {
                theme: 'colored',
            });
        }else{ //we added the like
            toast.success('Liked Comment Successfully!', {
                theme: 'colored',
            });
        }
       
    }else{
        toast.error(`${response.message}`, {
            theme: 'colored',
        });
    }


  }

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>{date}</span>
        <span className={styles.postCommentLikes}>
          {comment.likes.length} likes
        </span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
      <button
        className={styles.postCommentLike}
        onClick={handleCommentLikeClick}
      >
        <img
          src="https://img.icons8.com/ios-glyphs/120/000000/like--v2.png"
          alt="likes-icon"
        />
        <span>{comment.likes.length}</span>
      </button>
    </div>
  );
};


Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default Comment;