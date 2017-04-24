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
  return await News.find();
}

export default News;
