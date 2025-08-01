import { IoHeartSharp } from "react-icons/io5"
import { favoriteContext } from "../context/Context"
import { Link } from "react-router-dom"

export default function Header() {

    const { favorites } = favoriteContext()
    const counter = favorites.length

    return (
        <header className="w-screen smartcolor-bg shadow-xl text-white ">
            <div className="px-6 py-4 max-w-7xl m-auto flex items-center justify-between">
                <Link to={'/'} className="text-xl font-bold hover:opacity-85 duration-300">SmartShop</Link>
                <Link className="flex items-center gap-1 cursor-pointer hover:opacity-85 duration-300" to={'/favorites'}>
                    {counter} <IoHeartSharp size={20} />
                </Link>
            </div>
        </header>
    )
}
