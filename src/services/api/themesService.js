import mockThemes from '@/services/mockData/themes.json'

class ThemesService {
  constructor() {
    this.themes = [...mockThemes]
    this.delay = () => new Promise(resolve => setTimeout(resolve, 200))
  }

  async getAll() {
    await this.delay()
    return [...this.themes]
  }

  async getById(id) {
    await this.delay()
    const theme = this.themes.find(t => t.Id === id)
    if (!theme) {
      throw new Error('Theme not found')
    }
    return { ...theme }
  }

  async create(themeData) {
    await this.delay()
    const newTheme = {
      Id: Math.max(...this.themes.map(t => t.Id), 0) + 1,
      ...themeData
    }
    this.themes.push(newTheme)
    return { ...newTheme }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.themes.findIndex(t => t.Id === id)
    if (index === -1) {
      throw new Error('Theme not found')
    }
    this.themes[index] = { ...this.themes[index], ...updates }
    return { ...this.themes[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.themes.findIndex(t => t.Id === id)
    if (index === -1) {
      throw new Error('Theme not found')
    }
    const deleted = this.themes.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const themesService = new ThemesService()