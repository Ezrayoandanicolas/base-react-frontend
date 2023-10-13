import AxiosConfig from '../../AxiosConfig'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ArticleList = () => {
    const { axios } = AxiosConfig
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

    // All Type data Article
    interface Article {
        title: string;
        content: string;
        slug: string;
        users: {
            name: string;
          };
        // Tambahkan properti lain sesuai kebutuhan
    }

    const [articleData, setArticleData] = useState([]); // State untuk menyimpan data artikel
    // Efek samping untuk melakukan permintaan HTTP saat komponen dimount
    useEffect(() => {
        async function fetchData() {
            try {
                // Contoh GET request
                const response = await axios.get('v1/guest/getArticle');
                console.log(response.data.data);
                setArticleData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData(); // Panggil fungsi fetchData saat komponen dimount
    }, []); // [] sebagai argumen kedua mengindikasikan bahwa efek ini hanya dijalankan saat komponen dimount

    return(
        <>
            <div className="relative mt-10 mx-5">
                <div className="article-list-mobile container mx-auto">
                    <h1 className="text-2xl font-bold underline underline-offset-4 mb-5">
                    10 Article Terbaru
                    </h1>
                    {articleData.map((article, index) => (
                    <div key={index} className="flex w-1/2 border border-gray-200 mb-5">
                        <img
                        src="https://i0.wp.com/dianisa.com/wp-content/uploads/2022/11/4-Gambar-pemandangan-gunung-dengan-sungai.jpg?resize=1280%2C720&ssl=1"
                        className="w-1/3 rounded-lg lg:flex-none bg-cover lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                        alt={article.title}
                        />
                        <div className="p-4 flex flex-col justify-between leading-normal">
                            <p className="text-sm text-gray-600 flex items-center">
                                <svg
                                className="fill-current text-gray-500 w-3 h-3 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                >
                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                Post on {article.users.name}
                            </p>
                            <div className="mb-8">
                                <p className="text-gray-900 font-bold text-xl mb-2 mt-2">
                                {trimmedText(article.title, maxCharacterLimit)}
                                </p>
                                <p className="text-gray-700 text-base whitespace-normal">
                                {trimmedText(article.content, 100)}
                                </p>
                            </div>
                            <div className="flex items-center justify-end">
                                <Link to={`/post/read/${article.slug}`}>
                                <button className="float-right bg-blue-500 text-white px-4 py-2 rounded-lg">
                                    Read Article
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ArticleList