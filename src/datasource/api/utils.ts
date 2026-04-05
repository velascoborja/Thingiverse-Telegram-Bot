import { AxiosInstance, AxiosError } from "axios"

export function get<T>(api: AxiosInstance, endpoint: string): Promise<T> {
    return new Promise((resolve, reject) => {
        api.get(endpoint)
            .then(async function (response) {
                resolve(response.data)
            })
            .catch(function (error: AxiosError) {
                const status = error.response?.status
                const message = `Thingiverse API error [${endpoint}]: HTTP ${status ?? 'no response'}`
                console.error(message)
                reject(new Error(message))
            })
    })
}