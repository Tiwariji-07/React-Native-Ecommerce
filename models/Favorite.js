const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
  {
    userId: { type: "string", required: true },
    products: [
      {
        favoriteItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);
