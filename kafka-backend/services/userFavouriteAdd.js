const UserFavourites = require("../models/UserFavouritesModel");

function handle_request(msg, callback) {
  let newFavourite = new UserFavourites({
    userId: msg.userId,
    restaurantId: msg.restaurantId,
  });
  newFavourite.save((error, doc) => {
    if (error) {
      callback(error, "Error");
    } else {
      callback(null, doc);
    }
  });
}

exports.handle_request = handle_request;
