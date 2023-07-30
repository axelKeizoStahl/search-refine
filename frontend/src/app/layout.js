import './global.css'
import { Inter } from 'next/font/google'
import Navbar from './Components/navbar.js'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
