import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='font-poppins'>
      <Header />
      <main className="px-6 py-10 max-w-7xl m-auto">{children}</main>
    </div>
  )
}