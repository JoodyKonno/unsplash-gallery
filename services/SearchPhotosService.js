import axios from 'axios'
import { unsplashAccessKey } from '../config/keys.config'
import { endpoint, searchPath } from '../config/unsplash.config'

export default {
  async query({ q, page=1, per_page=18 }) {
    const { data, status } = await axios.get(`${endpoint}/${searchPath}`, {
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
      params: {
        query: q,
        page,
        per_page,
      },
    })

    if (status >= 400 && status <= 599) {
      throw new Error();
    }

    return data
  }
}
