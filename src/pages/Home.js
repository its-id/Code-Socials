import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import { getPosts } from '../api/index';
import { Loader } from '../components';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); //initially we set laoding to true
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      // console.log('response', response);

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false); // as soon as the response is fetched we set it to false
    };

    fetchPosts();
  }, []);

  if(loading){
    return <Loader />;
  }

  console.log(posts);
  return (
    <div className={styles.postsList}>
      {posts.map((post) => {
        return (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/essenstial-ultimate-ui/64/avatar-512.png"
                  alt="user-pic"
                />
                <div>
                  <span className={styles.postAuthor}>{post.user.name}</span>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.content}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://e7.pngegg.com/pngimages/615/837/png-clipart-heart-symbol-love-symbol-love-text.png"
                    alt="likes-icon"
                  />
                  <span>5</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://www.seekpng.com/png/detail/504-5047114_chat-icon-comments-icon.png"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
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
      })}
    </div>
  );
};

//will work only in development mode
// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };
