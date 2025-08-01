import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import json from '../database/produtos_com_variacoes.json'
import categories_json from '../database/categorias.json'
import type { CategoryType, ProductType } from '../types/product_type'
import ProductCard from '../components/ProductCard'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoFilterSharp } from 'react-icons/io5'

export default function Home() {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')

    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const [showFilters, setShowFilters] = useState<boolean>(false)

    const database = json as ProductType[]
    const categories = categories_json as CategoryType[]

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

    const filteredProducts = products.filter(product => {
        const searchLower = search.toLowerCase()
        const matchesName = product.nome?.toLowerCase().includes(searchLower)

        const categories_match = product.categorias.map((category_id) => {
            const category = categories.find((item) => item.id === category_id)
            return category?.nome
        })
        const matchesCategory = categories_match.some(category => category?.toLowerCase().includes(searchLower))

        const price = product.preco ? parseFloat(product.preco) : 0;
        const priceMatch =
            (!minPrice || price >= parseFloat(minPrice)) &&
            (!maxPrice || price <= parseFloat(maxPrice));

        return (matchesName || matchesCategory) && priceMatch
    })

    const totalPages = Math.ceil(filteredProducts.length / 12)
    const startIndex = (currentPage - 1) * 12
    const endIndex = startIndex + 12
    const currentItems = filteredProducts.slice(startIndex, endIndex)

    return (
        <Layout>
            <div className="mb-6 space-y-4">

                <h1 className='text-center text-2xl font-semibold mb-10'>Produtos</h1>
                <div className='w-full flex items-center gap-3 max-w-md mx-auto border px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Buscar por nome ou categoria..."
                        className="outline-0 w-full"
                    />
                    <FaMagnifyingGlass size={20} className={`${search.length > 0 ? 'smartcolor' : ''} duration-300`} />
                </div>


                <div className='w-full flex justify-end duration-500'>
                    <button className={`cursor-pointer`} onClick={() => setShowFilters((prev) => !prev)}>
                        <IoFilterSharp size={20} className={` ${showFilters ? 'smartcolor' : ''}`} />
                    </button>
                </div>
                {
                    showFilters &&
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(e.target.value)
                                setCurrentPage(1)
                            }}
                            placeholder="Preço mínimo"
                            className="border px-3 py-2 rounded-md shadow-md outline-0"
                        />
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => {
                                setMaxPrice(e.target.value)
                                setCurrentPage(1)
                            }}
                            placeholder="Preço máximo"
                            className="border px-3 py-2 rounded-md shadow-md outline-0"
                        />
                    </div>
                }
            </div>

            {loading ? (
                <p className="text-center mt-10 text-gray-500">Carregando produtos...</p>
            ) : (
                <>
                    {filteredProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {currentItems.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {filteredProducts.length > 12 &&
                                <div className="flex justify-center items-center gap-4 mt-8">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="disabled:opacity-50 cursor-pointer disabled:cursor-auto"
                                    >
                                        <IoIosArrowBack size={20} className='smartcolor' />
                                    </button>
                                    <span className="text-gray-600">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="disabled:opacity-50 cursor-pointer disabled:cursor-auto"
                                    >
                                        <IoIosArrowForward size={20} className='smartcolor' />
                                    </button>
                                </div>
                            }
                        </>
                    ) : (
                        <p className="text-center mt-10 text-gray-500">Nenhum produto encontrado...</p>
                    )}
                </>
            )}
        </Layout>
    )
}
