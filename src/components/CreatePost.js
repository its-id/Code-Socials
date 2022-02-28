import { useState } from 'react';
import styles from '../styles/home.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addPost } from '../api';
import { usePosts } from '../hooks';

const CreatePost = () => {

    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);
    const posts = usePosts();


    const handleAddPostClick = async () => {

        setAddingPost(true);

        let error = false;

        //some basic checks
        if(post.length === 0){
            toast.error('Content cannot be empty!', {
                theme: 'colored',
            });
            error = true;
        }
        if(error === true){
            return setAddingPost(false);
        }

        const response = await addPost(post);
        
        if(response.success){
            setPost('');
            posts.addPostsToState(response.data.post); //updating our posts state as well to make our post visible as soon as posting it.
            toast.success('Post created Successfully!', {
                theme: 'colored',
            });
        }else{
            toast.error(`${response.message}`, {
                theme: 'colored',
            });
        }

        setAddingPost(false);

    }


    return(
        <div className={styles.createPost}>
            <textarea className={styles.addPost} value={post} onChange={(e) => {setPost(e.target.value)}}/>

            <div>
                <button className={styles.addPostBtn} onClick={handleAddPostClick} disabled={addingPost}> {addingPost ? 'Adding Post...' : 'Add Post'}</button>
            </div>
        </div>
    )
}

export default CreatePost;