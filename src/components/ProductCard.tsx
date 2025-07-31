import type { CategoryType, ProductType } from '../types/product_type'
import categories_json from '../database/categorias.json'
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { useState } from 'react';
import Modal from './Modal';

interface ProductCardProps {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
  const categories = categories_json as CategoryType[]
  const [favorite, setFavorite] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const categories_match = product.categorias.map((productID) => {
    const category = categories.find((categoryItem) => categoryItem.id === productID)
    return category?.nome
  })

  return (
    <>
      <div
        className="flex justify-between items-start border rounded-lg p-4 shadow hover:scale-[1.02] hover:cursor-pointer transition duration-300"
        onClick={() => {
          setShowModal(!showModal)
        }}
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {product.nome || 'Nome desconhecido'}
          </h2>
          <p className="text-gray-600 mb-2">
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
          className="hover:cursor-pointer hover:scale-[1.1] transition duration-300"
          onClick={(e) => {
            e.stopPropagation()
            setFavorite(!favorite)
          }}
        >
          {favorite ? <IoHeartSharp size={20} className='z-50' /> : <IoHeartOutline size={20} className='z-50' />}
        </button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} product={product} favorite={favorite} setFavorite={setFavorite} />
    </>
  )
}