import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const NewsSchema = new Schema({
  title: String,
  message: String,
  date: Date
});

NewsSchema.options.toJSON = NewsSchema.options.toJSON || {};
NewsSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

const News = mongoose.model('news', NewsSchema);

export async function add(params) {
  const news = new News({ ...params, date: Date.now() });
  return await news.save();
}

export async function getAll() {
  return await News.find().sort({ date: -1 });
}

export async function getById(newsId) {
  return await News.findById(newsId).exec();
}

export async function remove(news) {
  return await news.remove();
}

export default News;
