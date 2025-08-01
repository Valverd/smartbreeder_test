import { createContext, useState, useEffect, useContext } from "react"
import type { ReactNode } from "react"
import type { ProductType } from "../types/product_type"

export type ContextType = {
    favorites: ProductType[]
    setFavorites: React.Dispatch<React.SetStateAction<ProductType[]>>
}

export const Context = createContext<ContextType | null>(null)

export function ContextProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<ProductType[]>([])

    useEffect(() => {
        const stored = localStorage.getItem("favorites")
        if (stored) setFavorites(JSON.parse(stored))
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    return (
        <Context.Provider value={{ favorites, setFavorites }}>
            {children}
        </Context.Provider>
    )
    
}

export function favoriteContext() {
  const context = useContext(Context)
  if (!context) throw new Error("Contexto não está disponível")
  return context
}
