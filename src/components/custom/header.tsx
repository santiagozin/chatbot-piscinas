'use client'
import { useState } from 'react'
import { Menu, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Inicio', href: '#' },
    { name: 'Productos', href: '#' },
    { name: 'Sobre Nosotros', href: '#' },
    { name: 'Contacto', href: '#' },
  ]

  const cartItems = [
    { name: 'Producto 1', price: 19.99 },
    { name: 'Producto 2', price: 29.99 },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2" aria-label="Abrir menú">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <nav>
                <ul className="space-y-4 mt-8">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <SheetClose asChild>
                        <a 
                          href={item.href} 
                          className="text-lg text-cyan-600 hover:bg-cyan-500 hover:text-white font-medium block py-2 px-4 rounded transition duration-150 ease-in-out"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <a href="#" className="text-2xl font-bold text-white">TodoPiletas</a>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative" aria-label="Ver carrito">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-cyan-500 text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <h3 className="font-semibold mb-2">Carrito de Compras</h3>
            {cartItems.length > 0 ? (
              <ul className="space-y-2">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tu carrito está vacío</p>
            )}
            <div className="mt-4">
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Ir al Carrito</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}