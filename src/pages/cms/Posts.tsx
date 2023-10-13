import { useState, useEffect } from 'react';
import AxiosConfig from '../../AxiosConfig';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const { axios, setAuthToken } = AxiosConfig;

const Posts = () => {
    const cookies = new Cookies()
    const [articles, setArticles] = useState([]);
    const [addPost, setAddPost] = useState(false)
    const [editPost, setEditPost] = useState(false)
    const [deletePost, setDeletePost] = useState(false)

    // Tentukan batas karakter untuk teks
    const maxCharacterLimit = 25;

    // Fungsi untuk memotong teks jika melebihi batas karakter
    const trimText = (text: string, limit: number) => {
        return text.slice(0, limit) + (text.length > limit ? "..." : "");
    };

    function trimmedText(value: string, maxCharacterLimit: number) {
        // Panggil fungsi trimText untuk menghasilkan teks yang sudah dipotong jika perlu
        return trimText(value, maxCharacterLimit)
    }

    useEffect(() => {
        loadArticle();
      }, []); // Memasukkan slug ke dalam dependency array
    
      async function loadArticle() {
          setAuthToken(cookies.get('Authorization'));
          const resAuthPermissions = await axios.get('v1/auth/checkPermission');
          console.log(resAuthPermissions.data.data.permissions.some(perm => perm.name === 'create-post'))

          const permissionsDefault = resAuthPermissions.data.data.roles[0].permissions
            const permissionsCustom = resAuthPermissions.data.data.permissions
            console.log(permissionsDefault)
            console.log(permissionsDefault.some(perm => perm.name === 'create-post'))
            console.log(permissionsCustom.length > 0 ? permissionsCustom.some(perm => perm.name === 'create-post') : permissionsDefault.some(perm => perm.name === 'create-post'))
            setAddPost(permissionsCustom.length > 0 ? permissionsCustom.some(perm => perm.name === 'create-post') : permissionsDefault.some(perm => perm.name === 'create-post'));
            setEditPost(permissionsCustom.length > 0 ? permissionsCustom.some(perm => perm.name === 'edit-post') : permissionsDefault.some(perm => perm.name === 'edit-post'));
            setDeletePost(permissionsCustom.length > 0 ? permissionsCustom.some(perm => perm.name === 'delete-post') : permissionsDefault.some(perm => perm.name === 'delete-post'));

          axios.get(`v1/guest/getArticle`)
          .then((response) => {
            console.log(response.data.data)
            const articleData = response.data.data;
            setArticles(articleData);
          })
          .catch((error) => {
            console.error('Error fetching article:', error);
          });
      }

      const handleDelete = (slug) => {
            if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
                axios.delete(`v1/auth/deleteArticle/${slug}`)
                    .then((response) => {
                        console.log("Artikel berhasil dihapus");
                        // Tambahan: Anda bisa melakukan refresh atau memuat ulang daftar artikel setelah penghapusan.
                        loadArticle();
                    })
                    .catch((error) => {
                        console.error("Gagal menghapus artikel:", error);
                    });
            }
        };

    return(
        <>
           <div className='container mt-20 mx-auto'>
            {addPost && (
            <div className="container mt-4 mb-5 mx-auto flex justify-end">
                <Link to="create" className="bg-green-500 text-white py-2 px-4 rounded-lg">Tambah Artikel</Link>
            </div>
            )}
                {articles.map((article) => (
                    <div key={article.id} className="flex border border-gray-200 p-4 mb-4">
                        <div className="w-1/6">
                            {/* Tampilkan gambar artikel jika ada */}
                            {article.image && (
                                <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                            )}
                        </div>
                        <div className="w-3/4 pl-4">
                            <h2 className="text-xl font-semibold">{trimmedText(article.title, maxCharacterLimit)}</h2>
                            <p className="text-gray-500">{article.created_at}</p>
                            <p className="mt-2">{trimmedText(article.content, 100)}</p>
                            <div className="mt-4">
                                {editPost && (
                                    <Link to={`update/${article.slug}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2">Edit</Link>
                                )}
                                {deletePost && (
                                <button
                                    onClick={() => handleDelete(article.slug)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                                >
                                    Delete
                                </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Posts