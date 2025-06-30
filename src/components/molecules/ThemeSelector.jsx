import { motion } from 'framer-motion'

const ThemeSelector = ({ selectedTheme, onThemeSelect, themes = [] }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Choose Event Theme
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {themes.map((theme) => (
          <motion.div
            key={theme.Id}
            className={`
              relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200
              ${selectedTheme === theme.Id 
                ? 'border-primary-500 ring-2 ring-primary-200' 
                : 'border-gray-200 hover:border-primary-300'
              }
            `}
            onClick={() => onThemeSelect(theme.Id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="h-20 w-full"
              style={{ 
                background: theme.primaryColor,
                backgroundImage: theme.backgroundImage ? `url(${theme.backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="p-3 bg-white">
              <h4 className="text-sm font-medium text-gray-900 text-center">
                {theme.name}
              </h4>
            </div>
            
            {selectedTheme === theme.Id && (
              <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector