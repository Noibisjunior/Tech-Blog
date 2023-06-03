import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from './Editor';
import { toast } from 'react-toastify';

const EditPost = () => {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [articleImage, setArticleImage] = useState('');
  const [categories, setCategories] = useState('');
const Navigate = useNavigate()

  useEffect(() => {
    fetch(`https://backend-pmep.onrender.com/posts/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setArticleImage(postInfo.articleImage);
        setContent(postInfo.content);
        setCategories(postInfo.categories);
        setSummary(postInfo.summary);
      });
    });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('categories', categories);
    data.append('content', content);
    data.append('articleImage', articleImage); // Add the file to the FormData object

    const response = await fetch(
      `https://backend-pmep.onrender.com/posts/${id}`,
      {
        method: 'PUT',
        body: data,
      }
    );

    if (response.ok) {
      toast.success('Article updated successfully');
      Navigate('/');
    }
    else{
      toast.error('Article could not be updated')
    }
  }

  
  return (
    <form onSubmit={updatePost} encType="multipart/form-data">
      <input
        type="text"
        placeholder={'title'}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder={'categories'}
        value={categories}
        onChange={(ev) => setCategories(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={'summary'}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="file"
        onChange={(ev) => setArticleImage(ev.target.files[0])}
        accept=".png, .jpg, .jpeg"
      />
      <Editor onChange={setContent} value={content} />
      <button className="btn">Update Post</button>
    </form>
  );
};

export default EditPost;
