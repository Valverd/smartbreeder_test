import Layout from '../components/Layout'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { favoriteContext } from '../context/Context'

export default function Favorite() {
    const [currentPage, setCurrentPage] = useState(1)
    const { favorites } = favoriteContext()

    const totalPages = Math.ceil(favorites.length / 12)
    const startIndex = (currentPage - 1) * 12
    const endIndex = startIndex + 12
    const currentItems = favorites.slice(startIndex, endIndex)

    return (
        <Layout>
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {currentItems.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {favorites.length > 12 &&
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="disabled:opacity-50 cursor-pointer"
                        >
                            <IoIosArrowBack size={20} />
                        </button>
                        <span className="text-gray-600">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="disabled:opacity-50 cursor-pointer"
                        >
                            <IoIosArrowForward size={20} />
                        </button>
                    </div>
                }

                {favorites.length === 0 &&
                    <p className="text-center mt-10 text-gray-500">Nenhum produto favoritado...</p>
                }

            </>
        </Layout>
    )
}