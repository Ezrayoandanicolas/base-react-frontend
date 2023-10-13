import { useEffect, useState } from "react"
import { FaUser, FaNewspaper } from 'react-icons/fa';
import AxiosConfig from "../../AxiosConfig"
// import { axiosInstance, setAuthToken } from "../../AxiosConfig"
import Cookies from "universal-cookie"

const Dashboard = () => {
    const [Users, setUsers] = useState(null)
    const cookies = new Cookies()
    const { axios, setAuthToken } = AxiosConfig;

    const [userData, setUserData] = useState([]);
    const [articleData, setArticleData] = useState([]);

    useEffect(() => {
        setAuthToken(cookies.get('Authorization'));
        // Ambil data pengguna dari API
        axios.get('v1/auth/countUsers')
        .then((response) => {
            setUserData(response.data.count);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });

        // Ambil data artikel dari API
        axios.get('v1/auth/countArticles')
        .then((response) => {
            setArticleData(response.data.count);
        })
        .catch((error) => {
            console.error('Error fetching article data:', error);
        });
    }, []);
 // [] sebagai argumen kedua mengindikasikan bahwa efek ini hanya dijalankan saat komponen dimount

    return (
        <>
            <div className="container mt-20 m-auto">
            <div className="grid grid-cols-2 gap-4">
                {/* Data Pengguna */}
                <div className="p-4 border rounded-lg shadow-md">
                <div className="flex items-center">
                    <FaUser className="text-2xl mr-2" />
                    <h2 className="text-lg font-semibold">Data Pengguna</h2>
                </div>
                <p>Jumlah Pengguna: {userData}</p>
                </div>

                {/* Data Artikel */}
                <div className="p-4 border rounded-lg shadow-md">
                <div className="flex items-center">
                    <FaNewspaper className="text-2xl mr-2" />
                    <h2 className="text-lg font-semibold">Data Artikel</h2>
                </div>
                <p>Jumlah Artikel: {articleData}</p>
                </div>
            </div>
            </div>
        </>
    )
}

export default Dashboard