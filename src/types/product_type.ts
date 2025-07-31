export type ProductType = {
  id: number
  nome: string | null
  categorias: number[]
  preco: string | null
  descricao: string
  variacao: ProductVariation[]
}

type ProductVariation = {
  estoque: "sim" | "não"
  vendedor: string
  fabricante: string
  cor: string
  voltagem: "110V" | "220V" | "Bivolt"
  tamanho: "P" | "M" | "G"
  garantia: string
  peso: string | null
  dimensoes: string | null
}

export type CategoryType = {
  id: number
  nome: string
}