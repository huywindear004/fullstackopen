const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => (blog.likes > max.likes ? blog : max),
    blogs[0] || null
  );
};

const mostBlogs = (blogs) => {
  const freqDict = blogs.reduce((acc, curr) => {
    acc[curr.author] = (acc[curr.author] || 0) + 1;
    return acc;
  }, {});

  const freqList = Object.entries(freqDict);

  const firstEntry = freqList[0]
    ? { author: freqList[0][0], blogs: freqList[0][1] }
    : null;

  return freqList.reduce(
    (max, [author, blogs]) => (blogs > max.blogs ? { author, blogs } : max),
    firstEntry
  );
};

const mostLikes = (blogs) => {
  const likesDict = blogs.reduce((acc, curr) => {
    acc[curr.author] = (acc[curr.author] || 0) + curr.likes;
    return acc;
  }, {});

  const likesList = Object.entries(likesDict);
  const firstEntry = likesList[0]
    ? { author: likesList[0][0], likes: likesList[0][1] }
    : null;

  return likesList.reduce(
    (max, [author, likes]) => (likes > max.likes ? { author, likes } : max),
    firstEntry
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
