// src/pages/Home.tsx
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import json from '../database/produtos_com_variacoes.json'
import type { ProductType } from '../types/product_type'
import ProductCard from '../components/ProductCard'

function Home() {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)

    const database = json as ProductType[]

    function fetch_products(): Promise<ProductType[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(database)
            }, 500)
        })
    }

    useEffect(() => {
        fetch_products()
            .then((data) => {
                setProducts(data)
                setLoading(false)
            })
            .catch((error) => alert(error))
    }, [])

    // Paginação
    const totalPages = Math.ceil(products.length / 12)
    const startIndex = (currentPage - 1) * 12
    const endIndex = startIndex + 12
    const currentItems = products.slice(startIndex, endIndex)

    return (
        <Layout>
            {loading ? (
                <p className="text-center mt-10 text-gray-500">Carregando produtos...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {currentItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Controles de Paginação */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded text-sm disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span className="text-gray-600">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded text-sm disabled:opacity-50"
                        >
                            Próxima
                        </button>
                    </div>
                </>
            )}
        </Layout>
    )
}

export default Home
