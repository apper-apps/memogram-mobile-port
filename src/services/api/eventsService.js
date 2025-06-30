import mockEvents from '@/services/mockData/events.json'

class EventsService {
  constructor() {
    this.events = [...mockEvents]
    this.delay = () => new Promise(resolve => setTimeout(resolve, 300))
  }

  async getAll() {
    await this.delay()
    return [...this.events].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  async getById(id) {
    await this.delay()
    const event = this.events.find(e => e.Id === id)
    if (!event) {
      throw new Error('Event not found')
    }
    return { ...event }
  }

  async create(eventData) {
    await this.delay()
    const newEvent = {
      Id: Math.max(...this.events.map(e => e.Id), 0) + 1,
      ...eventData,
      createdAt: new Date().toISOString(),
      mediaCount: 0
    }
    this.events.push(newEvent)
    return { ...newEvent }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.events.findIndex(e => e.Id === id)
    if (index === -1) {
      throw new Error('Event not found')
    }
    this.events[index] = { ...this.events[index], ...updates }
    return { ...this.events[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.events.findIndex(e => e.Id === id)
    if (index === -1) {
      throw new Error('Event not found')
    }
    const deleted = this.events.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const eventsService = new EventsService()