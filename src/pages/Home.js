import styles from '../styles/home.module.css';
export const Home = ({ posts }) => {
  return (
    <div className={styles.postsList}>
      {posts.map((post) => {
        return(
          <div className={styles.postWrapper}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1644001945~hmac=d940a73e4a060ba030a30a47dc02eb1e"
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
                    src="https://cdn-icons.flaticon.com/png/512/2961/premium/2961957.png?token=exp=1644002057~hmac=8efac28d9a039394b6a4e384ca5e7d3e"
                    alt="likes-icon"
                  />
                  <span>5</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons.flaticon.com/png/512/3318/premium/3318523.png?token=exp=1644002092~hmac=f5d93db6f8efb12fc6f9ad709c2c4fdc"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                <div className={styles.postCommentsItem}>
                  <div className={styles.postCommentHeader}>
                    <span className={styles.postCommentAuthor}>Bill</span>
                    <span className={styles.postCommentTime}>a minute ago</span>
                    <span className={styles.postCommentLikes}>22</span>
                  </div>

                  <div className={styles.postCommentContent}>
                    Random comment
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
