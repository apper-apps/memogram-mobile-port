import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  title = "Something went wrong",
  message = "We're having trouble loading this content. Please try again.",
  onRetry,
  showRetry = true
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <ApperIcon name="AlertTriangle" className="h-10 w-10 text-red-500" />
      </motion.div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center max-w-md mb-8">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {showRetry && onRetry && (
          <Button 
            onClick={onRetry}
            variant="primary"
            icon="RefreshCw"
          >
            Try Again
          </Button>
        )}
        
        <Button 
          onClick={() => window.history.back()}
          variant="secondary"
          icon="ArrowLeft"
        >
          Go Back
        </Button>
      </div>
    </motion.div>
  )
}

export default Error