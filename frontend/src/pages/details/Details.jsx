import React, { useState, useEffect } from 'react';
import './details.css';
import '../../components/header/header.css';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { useParams,Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailsPages = () => {
  const [blogs, setBlogs] = useState({});
  const params = useParams(); //{blogId: props.blogId}
const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/posts/${params.id}`
        );
        const posts = await response.json();
        setBlogs(posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
  try {
    const response = await fetch(`http://localhost:5000/posts/${params.id}`, {
      method: 'DELETE',
    });
    toast.success('Article deleted successfully');
    Navigate('/');
  } catch (error) {
     toast.error('Article already deleted');
  }
};


  const imageUrl = `http://localhost:5000/uploads/${blogs.articleImage}`;

  return (
    <>
      <section className="singlePage">
        <div className="container">
          <div className="left">
            <h1>{blogs.title}</h1>
            <img src={imageUrl} alt="img" className="img" />
          </div>
          <div className="right">
            <div className="buttons">
              <Link to={`/edit/${blogs._id}`}>
                <BsPencilSquare />
                Edit this post
              </Link>
              <button className='btns' onClick={handleDelete}>
                <AiOutlineDelete />
                Delete this post
              </button>
            </div>
            <div className="tags">
              <p>{blogs.author}</p>
              <p>#{blogs.categories}</p>
              <p>{blogs.createdAt}</p>
            </div>
            <p>{blogs.content}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailsPages;
