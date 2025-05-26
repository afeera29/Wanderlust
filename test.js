const mongoose = require('mongoose');

const uri = "mongodb+srv://afeerafirdoose29:firdoose2901@cluster0.tici6hk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Paste your full MongoDB URI here

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas!"))
.catch((err) => console.error("❌ Failed to connect:", err));
