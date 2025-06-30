import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const MediaUploadZone = ({ eventId, onUploadComplete }) => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    )
    
    if (validFiles.length !== newFiles.length) {
      toast.warning('Some files were skipped. Only images and videos are allowed.')
    }
    
    setFiles(prev => [...prev, ...validFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select files to upload')
      return
    }

    setUploading(true)
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real app, upload files to server
      const uploadedMedia = files.map((file, index) => ({
        Id: Date.now() + index,
        eventId,
        type: file.type.startsWith('image/') ? 'photo' : 'video',
        url: URL.createObjectURL(file),
        thumbnailUrl: URL.createObjectURL(file),
        caption: caption || '',
        uploaderId: 'guest-' + Date.now(),
        uploaderName: 'Guest User',
        uploadedAt: new Date().toISOString(),
        fileName: file.name,
        fileSize: file.size
      }))

      onUploadComplete?.(uploadedMedia)
      setFiles([])
      setCaption('')
      
      toast.success(`Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''}!`)
      
    } catch (error) {
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="card p-6 space-y-4">
      <div className="text-center">
        <ApperIcon name="Upload" className="h-8 w-8 text-primary-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Upload Photos & Videos
        </h3>
        <p className="text-gray-600 text-sm">
          Share your memories from this event
        </p>
      </div>

      {/* Upload Zone */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
          ${dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-primary-25'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => handleFiles(Array.from(e.target.files))}
          className="hidden"
          id="file-upload"
        />
        
        <label 
          htmlFor="file-upload"
          className="cursor-pointer block"
        >
          <ApperIcon name="ImagePlus" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop files here, or <span className="text-primary-600 font-medium">browse</span>
          </p>
          <p className="text-gray-400 text-sm">
            Supports: JPG, PNG, GIF, MP4, MOV
          </p>
        </label>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">
            Selected Files ({files.length})
          </h4>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon 
                    name={file.type.startsWith('image/') ? 'Image' : 'Video'} 
                    className="h-5 w-5 text-gray-500" 
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-48">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Caption Input */}
      <Input
        label="Caption (Optional)"
        placeholder="Add a caption to your photos..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        icon="MessageCircle"
      />

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        loading={uploading}
        disabled={files.length === 0}
        className="w-full"
        variant="primary"
        icon="Upload"
      >
        {uploading ? 'Uploading...' : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
      </Button>
    </div>
  )
}

export default MediaUploadZone