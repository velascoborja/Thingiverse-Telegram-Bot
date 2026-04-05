import axios from 'axios'

class UserStore {
    private baseUrl: string
    private token: string

    constructor() {
        this.baseUrl = process.env.UPSTASH_REDIS_REST_URL || ''
        this.token = process.env.UPSTASH_REDIS_REST_TOKEN || ''
    }

    private get headers() {
        return { Authorization: `Bearer ${this.token}` }
    }

    async getThingiverseUsername(userId: string): Promise<string> {
        const response = await axios.get(`${this.baseUrl}/get/user:${userId}`, { headers: this.headers })
        return response.data.result || ''
    }

    async setThingiverseUsername(userId: string, thingiverseUsername: string): Promise<void> {
        await axios.get(`${this.baseUrl}/set/user:${userId}/${encodeURIComponent(thingiverseUsername)}`, { headers: this.headers })
    }
}

export default UserStore
