import { createContext } from "react";
import { useProvidePosts } from "../hooks";

const initialState = {
    posts: [],
    loading: true,
    addPostsToState: () => { },
    addCommentsToState: () => { }
}

export const PostsContext = createContext(initialState); 
//The Context in react is used to share data between nested components without passing it as props.



//wll be wrapping this over our main App component
export const PostsProvider = ({children}) => {
    const posts = useProvidePosts(); //using our custom hook.
    return <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
}