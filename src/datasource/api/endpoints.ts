export const BASE_URL = 'https://api.thingiverse.com/'

export const ENDPOINTS = {
    userLikes: (user: string) => `users/${user}/likes`,
    userCollections: (user: string) => `users/${user}/collections`,
    userThings: (user: string) => `users/${user}/things`,
    userMakes: (user: string) => `users/${user}/copies`,
    collectionThings: (id: string) => `collections/${id}/things`,
    collection: (id: string) => `collections/${id}`,
    thingFiles: (id: any) => `things/${id}/files`,
    thingZip: (id: any) => `things/${id}/package-url`,
    tagThings: (tag: string) => `search/${tag}/tag`,
    search: (query: string) => `search/${query}?type=things&sort=relevant&page=1&per_page=50`,
    popular: () => `search/?page=1&per_page=50&sort=popular&posted_after=now-30d&type=things`,
    categories: () => `categories`,
}
