import axios, { AxiosInstance } from 'axios'
import { Category } from '../../models/category';
import { Collection } from '../../models/collection';
import { File } from '../../models/file';
import { Hits } from '../../models/hits';
import { Make } from '../../models/make';
import { Thing } from '../../models/thing';
import { Zip } from '../../models/zip';
import { get } from './utils';
import { BASE_URL, ENDPOINTS } from './endpoints';

class Thingiverse {
    getCategoryForId(categoryId: any) {
        throw new Error("Method not implemented.");
    }

    private api: AxiosInstance

    constructor(token: string) {
        this.api = axios.create({
            baseURL: BASE_URL,
            timeout: 15000,
            headers: { 'authorization': `Bearer ${token}` }
        })
    }

    getUserLikes(userName: string): Promise<Array<Thing>> {
        return get(this.api, ENDPOINTS.userLikes(userName))
    }

    getUserCollections(userName: string): Promise<Array<Collection>> {
        return get(this.api, ENDPOINTS.userCollections(userName))
    }

    getItemsForCollection(collectionId: string): Promise<Array<Thing>> {
        return get(this.api, ENDPOINTS.collectionThings(collectionId))
    }

    getCollectionForId(collectionId: string): Promise<Collection> {
        return get(this.api, ENDPOINTS.collection(collectionId))
    }

    getUsersDesigns(userName: string): Promise<Array<Thing>> {
        return get(this.api, ENDPOINTS.userThings(userName))
    }

    getFiles(thingId: any): Promise<Array<File>> {
        return get(this.api, ENDPOINTS.thingFiles(thingId))
    }

    getPublicZipUrlForThing(thingId: any): Promise<Zip> {
        return get(this.api, ENDPOINTS.thingZip(thingId))
    }

    searchThingsByTag(tag: string): Promise<Array<Thing>> {
        return get(this.api, ENDPOINTS.tagThings(tag))
    }

    searchThings(search: string): Promise<Hits> {
        return get(this.api, ENDPOINTS.search(search))
    }

    getUserMakes(userName: string): Promise<Array<Make>> {
        return get(this.api, ENDPOINTS.userMakes(userName))
    }

    getPopularThings(): Promise<Hits> {
        return get(this.api, ENDPOINTS.popular())
    }

    getCategories() : Promise<Array<Category>> {
        return get(this.api, ENDPOINTS.categories())
    }
}

export default Thingiverse