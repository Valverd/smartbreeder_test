// src/pages/Home.tsx
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import json from '../database/produtos_com_variacoes.json'
import type { ProductType } from '../types/product_type'
import ProductCard from '../components/ProductCard'

function Home() {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(true)
    const database = json as ProductType[]

    function fetch_products(): Promise<ProductType[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(database)
            }, 500)
        })
    }


    useEffect(() => {
        fetch_products().then((data) => {
            setProducts(data)
            setLoading(false)
        })
    }, [])

    return (
        <Layout>
            {loading ? (
                <p className="text-center mt-10 text-gray-500">Carregando produtos...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </Layout>
    )
}

export default Home
