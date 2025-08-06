const Post = require('../models/Post');
const slugify = require('../utils/slugify');

exports.createPost = async (req, res) => {
  try {
    let { title, content, tags, status } = req.body;
    let slug = slugify(title);
    
    
    let counter = 1;
    let originalSlug = slug;
    while (await Post.findOne({ slug })) {
      slug = `${originalSlug}-${counter}`;
      counter++;
    }
    
    const post = await Post.create({ title, slug, content, tags, status });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { search, tags, page = 1, limit = 10 } = req.query;
    const query = { status: 'published' };
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Post.countDocuments(query);
    
    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, status: 'published' });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    let updateData = { content, tags, status };
    
    if (title) {
      updateData.title = title;
      updateData.slug = slugify(title);
    }
    
    const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


