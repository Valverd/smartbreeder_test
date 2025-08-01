import type { CategoryType, ProductType } from '../types/product_type'
import categories_json from '../database/categorias.json'
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5"
import { useState } from 'react'
import Modal from './Modal'
import { favoriteContext } from '../context/Context'

interface ProductCardProps {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
  const categories = categories_json as CategoryType[]
  const { favorites, setFavorites } = favoriteContext()
  const [showModal, setShowModal] = useState<boolean>(false)

  const isFavorite = favorites.some((item: ProductType) => item.id === product.id)

  const categories_match = product.categorias.map((productID) => {
    const category = categories.find((categoryItem) => categoryItem.id === productID)
    return category?.nome
  })

  function handleFavorite(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()

    if (isFavorite) {
      setFavorites(favorites.filter((item) => item.id !== product.id))
      return
    }

    const productCategories = product.categorias
    let updatedFavorites = [...favorites]

    productCategories.forEach((category_id) => {
      const sameCategories = updatedFavorites.filter((favorite) =>
        favorite.categorias.includes(category_id)
      )
      if (sameCategories.length >= 2) {
        updatedFavorites = updatedFavorites.filter((favorite) => favorite.id !== sameCategories[0].id)
      }
    })

    updatedFavorites.push(product)
    setFavorites(updatedFavorites)
  }

  return (
    <>
      <div
        className="flex justify-between items-start border rounded-lg p-4 shadow-md hover:scale-[1.02] hover:cursor-pointer transition duration-300"
        onClick={() => {
          setShowModal(!showModal)
        }}
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {product.nome || 'Nome desconhecido'}
          </h2>
          <p className={`text-gray-600 mb-2 ${product.preco !== null ? 'text-green-800' : 'text-red-800'}`}>
            {product.preco !== null
              ? parseFloat(product.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
              : 'Preço não disponível'}
          </p>
          {categories_match.length > 0 && (
            <p className="text-sm text-gray-500">
              Categorias: {categories_match.join(', ')}
            </p>
          )}
        </div>
        <button
          className="hover:cursor-pointer hover:scale-[1.1] transition duration-300 smartcolor"
          onClick={handleFavorite}
        >
          {isFavorite ? <IoHeartSharp size={20} /> : <IoHeartOutline size={20} />}
        </button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} product={product} />
    </>
  )
}