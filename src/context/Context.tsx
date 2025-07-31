import React, { createContext, useContext, useState } from "react"
// import type { ProductType } from "../types/product_type"

type ContextProps = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ContextProps>({} as ContextProps)

export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <Context.Provider
            value={{
                showModal,
                setShowModal
            }}
        >
            {children}
        </Context.Provider>
    )
}