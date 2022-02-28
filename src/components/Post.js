import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addComment } from '../api';
import { usePosts } from '../hooks';
import { Comment } from './';

//getting this post as props from Home.js
const Post = ( {post} ) => {

    // console.log('post in Post.js', post);
    const [comment, setComment] = useState('');
    const [addingComments, setAddingComments] = useState(false);
    const posts = usePosts();


    //for parsing date
    const d = new Date(post.updatedAt);
    const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

    const handleAddComment = async (e) => {

        if(e.key === 'Enter'){
            setAddingComments(true);
            
            let error = false;
            //some basic checks
            if(comment.length === 0){
                toast.error('Content cannot be empty!', {
                    theme: 'colored',
                });
                error = true;
            }            

            if(error === true){
                return setAddingComments(false);
            }

            const response = await addComment(comment, post._id);
        
            if(response.success){
                setComment('');
                posts.addCommentsToState(response.data.comment, post._id); //updating our posts state as well to make our comment visible as soon as pressing enter.
                toast.success('Commented Successfully!', {
                    theme: 'colored',
                });
            }else{
                toast.error(`${response.message}`, {
                    theme: 'colored',
                });
            }
    
            setAddingComments(false);
        }

    }
        
    return (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
                <img
                src="https://cdn2.iconfinder.com/data/icons/essenstial-ultimate-ui/64/avatar-512.png"
                alt="user-pic"
                />
                <div>
                <Link to={`/user/${post.user._id}`} state={{user: post.user}} className={styles.postAuthor}>{post.user.name}</Link>
                <span className={styles.postTime}>{date}</span>
                </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
                <div className={styles.postLike}>
                <img
                    src="https://e7.pngegg.com/pngimages/615/837/png-clipart-heart-symbol-love-symbol-love-text.png"
                    alt="likes-icon"
                />
                <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                <img
                    src="https://www.seekpng.com/png/detail/504-5047114_chat-icon-comments-icon.png"
                    alt="comments-icon"
                />
                <span>{post.comments.length}</span>
                </div>
            </div>
            <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" value={comment} onChange={(e) => {setComment(e.target.value)}} onKeyDown={handleAddComment}/>
            </div>
            <div className={styles.postCommentsList}>
                {post.comments.map((comment) => {
                return (
                    <Comment key={`comment-${comment._id}`} comment={comment} />
                );
                })}
            </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
  };
  
export default Post;