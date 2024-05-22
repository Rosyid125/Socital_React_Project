import Post from "../post/Post";
import "./dist/posts.css";
import { AuthContext } from "../../context/authContext";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import api from "../../pages/services/api";

const Posts = () => {
  //TEMPORARY
  const { currentUser } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isUserProfilePage = location.pathname === "/profile/:userid";
  const { userid } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (isHomePage) {
          const userid = currentUser.userid;
          const response = await api.get("/users/{userid}/allposts".replace("{userid}", userid));
          setPosts(response.data.posts);
        } else {
          const response = await api.get("/users/{userid}/posts".replace("{userid}", userid));
          setPosts(response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // empty dependency array to ensure it only runs once on mount

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.postid} />
      ))}
    </div>
  );
};

export default Posts;
