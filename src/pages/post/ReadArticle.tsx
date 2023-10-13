import AxiosConfig from '../../AxiosConfig'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ReadArticle = () => {
    const { axios } = AxiosConfig

    interface readArticle {
        title: string;
        content: string;
        slug: string;
        users: {
            name: string;
          };
        // Tambahkan properti lain sesuai kebutuhan
    }

    const { slug } = useParams();
    const [readArticle, setArticleData] = useState(null); 

    useEffect(() => {
        async function fetchData() {
            try {
                // Contoh GET request
                const response = await axios.get(`v1/guest/getArticle/${slug}`);
                setArticleData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData(); // Panggil fungsi fetchData saat komponen dimount
    }, []);

    return(
        <>
            {readArticle ? (
                <div className="mt-16 container m-auto">
                    <div className="w-full mb-5">
                        <img src="https://i0.wp.com/dianisa.com/wp-content/uploads/2022/11/4-Gambar-pemandangan-gunung-dengan-sungai.jpg?resize=1280%2C720&ssl=1" className="m-auto w-66 h-66 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" />
                        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div className="mb-8">
                            <p className="text-sm text-gray-600 flex items-center">
                                <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                Post on { readArticle.users.name }
                            </p>
                            <div className="text-gray-900 font-bold text-xl mb-2 mt-2">{ readArticle.title }</div>
                                <p className="text-gray-700 text-base">{ readArticle.content }</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default ReadArticle