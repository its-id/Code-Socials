// import PropTypes from 'prop-types';

import styles from '../styles/home.module.css';
import {Post, Loader, FriendsList, CreatePost} from '../components';
import { useAuth, usePosts } from '../hooks';

const Home = () => {

  const auth = useAuth();
  const posts = usePosts();

  if(posts.loading){
    return <Loader />;
  }

  // console.log(posts);
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => {
          return <Post post={post} key={`post-${post._id}`} />
        })}
      </div>
      {auth.user && <FriendsList/>}
    </div>
  );
};

export default Home;

//will work only in development mode
// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };
