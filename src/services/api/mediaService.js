import mockMedia from '@/services/mockData/media.json'

class MediaService {
  constructor() {
    this.media = [...mockMedia]
    this.delay = () => new Promise(resolve => setTimeout(resolve, 400))
  }

  async getAll() {
    await this.delay()
    return [...this.media].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
  }

  async getById(id) {
    await this.delay()
    const mediaItem = this.media.find(m => m.Id === id)
    if (!mediaItem) {
      throw new Error('Media not found')
    }
    return { ...mediaItem }
  }

  async getByEventId(eventId) {
    await this.delay()
    return this.media
      .filter(m => m.eventId === eventId)
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
      .map(m => ({ ...m }))
  }

  async create(mediaData) {
    await this.delay()
    const newMedia = {
      Id: Math.max(...this.media.map(m => m.Id), 0) + 1,
      ...mediaData,
      uploadedAt: new Date().toISOString()
    }
    this.media.push(newMedia)
    return { ...newMedia }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.media.findIndex(m => m.Id === id)
    if (index === -1) {
      throw new Error('Media not found')
    }
    this.media[index] = { ...this.media[index], ...updates }
    return { ...this.media[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.media.findIndex(m => m.Id === id)
    if (index === -1) {
      throw new Error('Media not found')
    }
    const deleted = this.media.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const mediaService = new MediaService()