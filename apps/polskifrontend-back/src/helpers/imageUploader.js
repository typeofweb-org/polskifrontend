import cloudinary from 'cloudinary';

export default function imageUpload(imageUrl) {
  return new Promise((resolve, reject) => {
    try {
      cloudinary.uploader.upload(imageUrl, (result) => {
        resolve(result);
      }, {
        public_id: `favicon_${Date.now()}`,
        secure: true,
        width: 40,
        height: 40,
        crop: 'limit'
      });
    } catch (error) {
      reject(error);
    }
  });
}
