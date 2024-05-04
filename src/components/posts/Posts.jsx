import Post from "../post/Post";
import "./dist/posts.css";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../pages/services/api";

const Posts = () => {
  //TEMPORARY
  const posts = [
    {
      postid: 1,
      username: "John Doe",
      userid: 1,
      profilepicture: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      post: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      postpic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      postid: 2,
      username: "Jane Doe",
      userId: 2,
      profilepicture: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      post: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    },
  ];
  // const { currentUser } = useContext(AuthContext);
  // const [posts, setPosts] = useState([]);
  // const token = currentUser.token;

  // // Define headers with Authorization Bearer token
  // const headers = {
  //   Authorization: `Bearer ${token}`,
  // };

  // const [err, setErr] = useState(null);

  // const navigate = useNavigate();

  // const { logout } = useContext(AuthContext);

  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await api.post("/getpost", { headers });
  //     posts = response.data;
  //     console.log(response.data);
  //   } catch (err) {
  //     setErr(err.response.data);
  //   }
  // };

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.postid} />
      ))}
    </div>
  );
};

export default Posts;
