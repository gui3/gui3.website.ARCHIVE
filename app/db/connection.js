const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true,
  useUnifiedTopology: true} //recommended : true but timeout bug
)
.then(() => console.log('Mongo database connected successfully'))
.catch(err => console.error('Mongo connection error : ', err))

module.exports = mongoose;
