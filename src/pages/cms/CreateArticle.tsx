import { ChangeEvent, FormEvent, useState } from 'react';
import AxiosConfig from '../../AxiosConfig';
import Cookies from 'universal-cookie';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const { axios, setAuthToken } = AxiosConfig
const cookies = new Cookies()

interface ArticleEditorState {
  title: string;
  slug: string;
  content: string;
  image: File | null;
}

const ArticleEditor = () => {
  const [article, setArticle] = useState<ArticleEditorState>({
    title: '',
    slug: '',
    content: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setArticle({ ...article, image });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('slug', article.slug);
    formData.append('content', article.content);
    if (article.image) {
      formData.append('image', article.image);
    }

    setAuthToken(cookies.get('Authorization'));
    axios.post('v1/auth/createArticle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Penting untuk mengatur header ini
        },
      })
      .then((response) => {
        console.log('Article created:', response.data);
        MySwal.fire({
          text: 'Article created!',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
        window.location.href = '/cms/posts';
        // Lakukan tindakan lain seperti mereset form atau menavigasi pengguna
      })
      .catch((error) => {
        console.error('Error creating article:', error);
        MySwal.fire({
          text: 'Error: Pastikan kembali artikel sudah sesuai!',
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
        // Tangani kesalahan, misalnya, tampilkan pesan kesalahan kepada pengguna
      });
  };


  return (
    <>
        <div className="mt-20">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 shadow-lg rounded-lg">
                <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={article.title}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border rounded-lg focus:ring focus:ring-indigo-300"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-600">Slug:</label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={article.slug}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border rounded-lg focus:ring focus:ring-indigo-300"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-600">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    value={article.content}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border rounded-lg focus:ring focus:ring-indigo-300"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-600">Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/png"
                    onChange={handleImageChange}
                    className="w-full py-2 px-3 border rounded-lg focus:ring focus:ring-indigo-300"
                />
                </div>
                <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">Publish</button>
            </form>
            </div>

    </>
  );
};

export default ArticleEditor;