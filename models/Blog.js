const mongoose = require('mongoose');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom')
const DOMPurify = createDomPurify(new JSDOM().window)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  images: [{
    data: Buffer,
    contentType: String  
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


blogSchema.pre('validate',function(next){
  if (this.content) {
    this.content = DOMPurify.sanitize(this.content);
  }
  next()
})



const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
