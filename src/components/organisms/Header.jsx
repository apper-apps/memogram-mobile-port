import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: 'Home' },
    { name: 'My Events', href: '/my-events', icon: 'Calendar' },
    { name: 'Create Event', href: '/create', icon: 'Plus' },
  ]

  const isActive = (path) => location.pathname === path

return (
    <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 bg-gradient-artistic rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-glow">
              <ApperIcon name="Camera" className="h-6 w-6 text-white" />
              <div className="absolute inset-0 bg-gradient-artistic rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
            </div>
            <span className="text-2xl font-experimental font-bold gradient-text">
              Memogram
            </span>
          </Link>
{/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-500 overflow-hidden group
                  ${isActive(item.href)
                    ? 'bg-gradient-artistic text-white shadow-glow'
                    : 'text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-md'
                  }
                `}
              >
                <div className="absolute inset-0 bg-gradient-artistic opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <ApperIcon name={item.icon} className="h-4 w-4 relative z-10" />
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </nav>
{/* Mobile menu button */}
          <button
            className="md:hidden p-3 rounded-2xl text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <ApperIcon 
              name={mobileMenuOpen ? 'X' : 'Menu'} 
              className="h-6 w-6" 
            />
          </button>
        </div>
      </div>

{/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-black/60 backdrop-blur-xl border-t border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center space-x-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-500 relative overflow-hidden group
                  ${isActive(item.href)
                    ? 'bg-gradient-artistic text-white shadow-glow'
                    : 'text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-md'
                  }
                `}
              >
                <div className="absolute inset-0 bg-gradient-artistic opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <ApperIcon name={item.icon} className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header