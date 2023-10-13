import { useState } from 'react';

const ArticleMega = () => {
    // const text = "Teks yang akan dipotong jika terlalu panjang. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    // Tentukan batas karakter untuk teks
    const maxCharacterLimit = 50;

    // Fungsi untuk memotong teks jika melebihi batas karakter
    const trimText = (text: string, limit: number) => {
        return text.slice(0, limit) + (text.length > limit ? "..." : "");
    };

    // Panggil fungsi trimText untuk menghasilkan teks yang sudah dipotong jika perlu
    const trimmedText = trimText('Pemandangan Pegunungan Indah Sekali', maxCharacterLimit);

    
    return(
        <>
            <div className="relative mx-5">
                <div className="article-mega-mobile">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <img className="w-full" src="https://i0.wp.com/dianisa.com/wp-content/uploads/2022/11/4-Gambar-pemandangan-gunung-dengan-sungai.jpg?resize=1280%2C720&ssl=1" alt="Nama Gambar" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{trimmedText}</div>
                            <div className="each flex items-center justify-between text-gray-600 mb-5">
                                <div className="sec self-center p-2 pr-1"><img className="h-10 w-10 border p-0.5 rounded-full" src="https://lh3.googleusercontent.com/ogw/ADea4I6N5g9eo7pju00pg3_BF7q6WGS4m6iEzuLJ4iRskA=s32-c-mo" alt="" /></div>
                                <div className="sec self-center p-2 w-64">
                                    <div className="flex">
                                    <div className="name text-sm">Amir Rahman</div>
                                    </div>
                                    
                                    <div className="title text-xs text-gray-400 -mt-1">Post on 23 April 2001</div>
                                </div>
                                <div className="float-right">
                                    {/* Konten yang ingin ditampilkan di sebelah kanan */}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Read</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticleMega