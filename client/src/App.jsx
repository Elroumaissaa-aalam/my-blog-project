import React, { useEffect, useState } from 'react'
import { fetchPosts, createPost } from './utils/api'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState('')


  const [formData, setFormData] = useState({
    title: '',
   content: '',
    tags: '',
    status: 'published'
  })


  const loadPosts = async (searchParams = {}) => {
    try {
      setLoading(true)
      const response = await fetchPosts(searchParams)
   
      setPosts(response.data.posts || response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load posts')
   
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])


  const handleSearch = (e) => {
   e.preventDefault()
  
  
   const params = {}
   
   if (searchTerm) params.search = searchTerm
   
   if (selectedTags) params.tags = selectedTags
    loadPosts(params)
  }

  const handleReset = () => {
    setSearchTerm('')
    setSelectedTags('')
    loadPosts({})
  }

 
  const handleFormChange = (e) => {
    setFormData({
  
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    try {
      const postData = {
        ...formData,
  
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      await createPost(postData)
      setFormData({ title: '', content: '', tags: '', status: 'published' })
   
      setShowCreateForm(false)
      loadPosts()
    } catch (err) {
  
      setError('Failed to create post')
      console.error('Error creating post:', err)
    }
  }

  const formatDate = (date) => {
 
    return new Date(date).toLocaleDateString('en-US', {
 
      year: 'numeric',
      month: 'long',
 
      day: 'numeric'
    })
  }

  return (
    <div className="app">
   
   
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-logo" onClick={() => {
            setSelectedPost(null)
            setShowCreateForm(false)
          }}>
             Travel Blog
          </h1>
       
          <div className="nav-buttons">
         
            <button
              onClick={() => {
         
                setSelectedPost(null)
         
                setShowCreateForm(false)
              }}
              className="nav-btn secondary"
            >
              Home
            </button>
            <button
              onClick={() => {
                setSelectedPost(null)
          
                setShowCreateForm(true)
              }}
              className="nav-btn primary"
            >
              Write Post
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
   
        {showCreateForm && (
          <div className="create-form">
            <h2> Write New Post</h2>
            
            {error && <div className="error">{error}</div>}
            
            <form onSubmit={handleCreatePost}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                 
                  placeholder="Enter post title..."
                 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea
             
             id="content"
                  name="content"
             
                  value={formData.content}
                  onChange={handleFormChange}
             
                  required
                  placeholder="Write your travel story..."
             
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input
                  type="text"
                  id="tags"
              
                  name="tags"
                  value={formData.tags}
            
                  onChange={handleFormChange}
                  placeholder="travel, adventure, tips (comma separated)"
            
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  id="status"
             
                  name="status"
                  value={formData.status}
             
                  onChange={handleFormChange}
                  className="form-select"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                  Create Post
                </button>
                <button
                  type="button"
            
                  onClick={() => setShowCreateForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {selectedPost && (
          <div className="post-detail">
            <button
     
     onClick={() => setSelectedPost(null)}
              className="back-btn"
            >
              ← Back to Home
            </button>
            
            <h1>{selectedPost.title}</h1>
            <div className="post-detail-meta">
              <span className="post-date">{formatDate(selectedPost.createdAt)}</span>
      
              <div className="post-tags">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
     
     ))}
              </div>
            </div>


            <div className="post-content">{selectedPost.content}</div>
          </div>
        )}

        {!showCreateForm && !selectedPost && (
          <>
       
            <div className="hero">
              <h1> Welcome to Travel Blog</h1>
              <p>Discover amazing destinations, tips, and travel experiences</p>
            </div>

         
            <div className="search-section">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={selectedTags}
                  onChange={(e) => setSelectedTags(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn">Search</button>
                <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
              </form>
            </div>

        
            <div className="posts-section">
              <h2>Latest Posts</h2>
              
              {loading && <div className="loading">Loading posts...</div>}
              {error && <div className="error">{error}</div>}
              
              {!loading && posts.length === 0 && (
                <div className="no-posts">
                  <p>No posts found. Be the first to write one!</p>
                </div>
              )}
              
              {!loading && posts.length > 0 && (
                <div className="posts-grid">
                  {posts.map(post => (
                    <div
                      key={post._id}
                      className="post-card"
                      onClick={() => setSelectedPost(post)}
                    >
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">
                        {post.content.substring(0, 150)}...
                      </p>
                      <div className="post-meta">
                        <span className="post-date">{formatDate(post.createdAt)}</span>
                        <div className="post-tags">
          
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="tag">#{tag}</span>
          
          ))}
   
                          {post.tags.length > 3 && (
     
     <span className="tag">+{post.tags.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App

