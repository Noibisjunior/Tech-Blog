import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor';
import './create.css';

const Create = () => {
  const [redirect, setRedirect] = useState(false);
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    categories: '',
  });
  const { title, summary, categories } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]);
  };

  const Navigate = useNavigate();

  async function createNewPost(ev) {
    ev.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('summary', summary);
    form.append('categories', categories);
    form.append('content', content);
    form.append('articleImage', fileName);
    

    const response = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: form,
    });
    const result = await response.json();
    console.log(result);

    if (response.status === 200) {
      toast.success('Article created  successfully');
      Navigate('/');
    } else {
      toast.error('Please login to create a post ');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={createNewPost} encType="multipart/form-data">
      <>
        <input
          className="title"
          type="text"
          name="title"
          placeholder={'Title'}
          value={title}
          onChange={onChange}
          required
        />
        <input
          className="category"
          type="text"
          name="categories"
          placeholder={'Category'}
          value={categories}
          onChange={onChange}
          required
        />

        <input
          className="summary"
          name="summary"
          placeholder={'summary'}
          value={summary}
          onChange={onChange}
          required
        />
        <input
          type="file"
          filename="articleImage"
          onChange={handleFileChange}
          accept=".png, .jpg, .jpeg"
        />
        <Editor onChange={setContent} value={content} required />
        <button className="btn">Create Post</button>
      </>
    </form>
  );
};

export default Create;

// import React from 'react';
// import './create.css';
// // import { IoIosAddCircleOutline } from 'react-icons/io';

//  const Create = () => {
//   return (
//     <>
//       <section className="newPost">
//         <div className="container boxItems">
//           <div className="img ">
//             <img
//               src="https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               alt="img"
//               class="image-preview"
//             />
//           </div>
//           <form>
//             <div className="inputfile flexCenter">
//               <input type="file" accept="image/*" alt="img" />
//             </div>
//             <input type="text" placeholder="Title" />

//             <textarea name="" id="" cols="30" rows="10"></textarea>

//             <button className="button">Create Post</button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Create;
// const data = new FormData()
// data.set('title',title)
// data.set('summary',summary)
// // data.set('content',content)
// data.set('file',files[0])
