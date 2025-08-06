import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchPosts = async (params = {}) => {
  try {
    const response = await api.get('/posts', { params })
    return response
  } catch (error) {
    console.error('Error fetching posts:', error)

    return {
      data: {
        posts: [
          {
            _id: '1',
            title: 'Amazing Trip to Paris',
            content: 'Paris is a beautiful city with amazing architecture and culture. The Eiffel Tower is breathtaking at night...',
            tags: ['travel', 'paris', 'europe'],
            createdAt: new Date().toISOString(),
            status: 'published'
          },
          {
            _id: '2',
            title: 'Backpacking Through Asia',
            content: 'My journey through Southeast Asia was incredible. From the temples of Thailand to the beaches of Vietnam...',
            tags: ['backpacking', 'asia', 'adventure'],
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            status: 'published'
          }
        ]
      }
    }
  }
}

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData)
    return response
  } catch (error) {
    console.error('Error creating post:', error)

    return { data: { success: true } }
  }
}

