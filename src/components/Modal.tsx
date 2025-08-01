import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { CategoryType, ProductType } from "../types/product_type"
import { IoClose } from "react-icons/io5"
import categories_json from "../database/categorias.json"
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5"
import { favoriteContext } from "../context/Context"

type ModalProps = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    product: ProductType
}

export default function Modal({ showModal, setShowModal, product }: ModalProps) {
    const outRef = useRef<HTMLDivElement | null>(null)
    const categories = categories_json as CategoryType[]
    const { favorites, setFavorites } = favoriteContext()

    const isFavorite = favorites.some((item: ProductType) => item.id === product.id)

    function handleFavorite() {
        if (isFavorite) {
            setFavorites(favorites.filter((item: ProductType) => item.id !== product.id))
        } else {
            setFavorites([...favorites, product])
        }
    }

    useEffect(() => {
        function handleClickOut(event: MouseEvent) {
            if (outRef.current === event.target && showModal) {
                setShowModal(false)
            }
        }

        document.addEventListener("mousedown", handleClickOut)
        return () => {
            document.removeEventListener("mousedown", handleClickOut)
        }
    }, [showModal])

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center modal-overlay backdrop-blur-sm z-50"
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    ref={outRef}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto relative border border-gray-200"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-black hover:cursor-pointer transition duration-300"
                            title="Fechar"
                        >
                            <IoClose size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.nome || "Produto sem nome"}</h2>

                        {product.descricao && (
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                {product.descricao}
                            </p>
                        )}

                        <div className="space-y-3">
                            {product.preco !== null && (
                                <p className="text-lg font-semibold text-green-700">
                                    {parseFloat(product.preco).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                            )}

                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-1">Categorias</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.categorias.map((productID, index) => {
                                        const category = categories.find((categoryItem) => categoryItem.id === productID)?.nome
                                        return (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {category}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>

                            <button
                                className="flex items-center gap-1 my-4 p-2 smartcolor-bg text-white rounded-lg cursor-pointer hover:opacity-85 hover:scale-[1.05] transition duration-300"
                                onClick={handleFavorite}
                            >
                                {isFavorite ? (<>Desfavoritar <IoHeartSharp size={20} /></>) : (<>Favoritar <IoHeartOutline size={20} /></>)}

                            </button>

                            {product.variacao.length > 0 && (
                                <>
                                    <h3 className="text-base font-semibold text-gray-800 mt-10 text-center">Variações</h3>
                                    {product.variacao.map((variacao, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-lg shadow-customized"
                                        >
                                            {Object.entries(variacao).map(([propriedade, valor]) => {
                                                return (
                                                    <p key={propriedade} className="text-sm text-gray-700">
                                                        <span className="font-medium capitalize">{propriedade}:</span> {valor != null ? valor.charAt(0).toUpperCase() + valor.slice(1) : "Não Informado"}
                                                    </p>
                                                )
                                            }
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
