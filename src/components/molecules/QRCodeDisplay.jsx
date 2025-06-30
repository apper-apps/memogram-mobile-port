import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const QRCodeDisplay = ({ event }) => {
  const [showQR, setShowQR] = useState(false)

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(event.shareLink)
      toast.success('Share link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  const downloadQR = () => {
    // Create a canvas to generate QR code
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 200
    canvas.height = 200
    
    // Simple QR code placeholder (in real app, use QR library)
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, 200, 200)
    ctx.fillStyle = '#fff'
    ctx.fillRect(20, 20, 160, 160)
    ctx.fillStyle = '#000'
    
    // Create download link
    const link = document.createElement('a')
    link.download = `${event.name}-qr-code.png`
    link.href = canvas.toDataURL()
    link.click()
    
    toast.success('QR code downloaded!')
  }

  return (
    <div className="card p-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <ApperIcon name="QrCode" className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Event Access
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm">
          Share this QR code or link for easy guest access
        </p>

        {!showQR ? (
          <Button 
            onClick={() => setShowQR(true)}
            variant="outline"
            icon="Eye"
            className="w-full"
          >
            Show QR Code
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {/* QR Code Placeholder */}
            <div className="mx-auto w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-40 h-40 bg-black relative">
                <div className="absolute inset-2 bg-white">
                  <div className="w-full h-full bg-black opacity-80 flex items-center justify-center">
                    <span className="text-white text-xs font-mono">
                      QR CODE
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={downloadQR}
                variant="secondary"
                icon="Download"
                className="flex-1"
              >
                Download QR
              </Button>
              <Button 
                onClick={copyShareLink}
                variant="primary"
                icon="Link"
                className="flex-1"
              >
                Copy Link
              </Button>
            </div>
          </motion.div>
        )}

        <div className="border-t pt-4">
          <p className="text-xs text-gray-500 mb-2">Share Link:</p>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
            <span className="text-sm text-gray-700 font-mono flex-1 truncate">
              {event.shareLink}
            </span>
            <button
              onClick={copyShareLink}
              className="text-primary-600 hover:text-primary-700 p-1"
            >
              <ApperIcon name="Copy" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCodeDisplay