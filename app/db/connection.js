const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true,
  useUnifiedTopology: true}
)
.then(() => 'Mongo database connected successfully')
.catch(err => console.error('Mongo connection error : ', err))

module.exports = mongoose;
