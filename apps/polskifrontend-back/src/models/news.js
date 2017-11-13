import mongoose from 'mongoose';

const { Schema } = mongoose;
const NewsSchema = new Schema({
  title: String,
  message: String,
  date: Date
});

NewsSchema.options.toJSON = NewsSchema.options.toJSON || {};
NewsSchema.options.toJSON.transform = (doc, ret) => ret;

const News = mongoose.model('news', NewsSchema);

export async function add(params) {
  const news = new News({ ...params, date: Date.now() });
  const result = await news.save();
  return result;
}

export async function getAll() {
  const news = await News.find().sort({ date: -1 });
  return news;
}

export async function getById(newsId) {
  const news = await News.findById(newsId).exec();
  return news;
}

export async function remove(news) {
  const result = await news.remove();
  return result;
}

export async function getNewses(page) {
  const perPage = 5;
  const count = await News.count();
  const nextPage = count <= (page + 1) * perPage ? -1 : page + 2;
  const newses = await News
    .find()
    .sort({ date: -1 })
    .skip(perPage * page)
    .limit(perPage);

  return {
    newses,
    nextPage
  };
}

export default News;
