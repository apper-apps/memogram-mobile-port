import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}, ref) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:scale-105',
    ghost: 'text-primary-600 hover:bg-primary-50 hover:scale-105',
    danger: 'bg-gradient-to-r from-error to-red-500 text-white hover:scale-105',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg 
    transition-all duration-200 ease-out focus:outline-none focus:ring-2 
    focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100
  `

  return (
    <motion.button
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="mr-2 h-4 w-4 animate-spin" 
        />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon 
          name={icon} 
          className="mr-2 h-4 w-4" 
        />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon 
          name={icon} 
          className="ml-2 h-4 w-4" 
        />
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button