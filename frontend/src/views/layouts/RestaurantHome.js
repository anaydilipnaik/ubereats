import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { connect } from "react-redux";
import {
  getRestaurantDetailsById,
  getDishesByRestaurantId,
  getDishCategories,
  updateRestaurant,
} from "../../controllers/restaurants";
import DishCard from "../../components/cards/DishCard";
import EditDishModal from "../../components/modals/EditDishModal";

const RestaurantHome = ({ restaurant }) => {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [dishes, setDishes] = useState(null);
  const [editDishModal, setEditDishModal] = useState(false);
  const [dishDetails, setDishDetails] = useState(null);
  const [dishCategories, setDishCategories] = useState(null);
  // restaurant details
  const [restaurantName, setRestaurantName] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [timings, setTimings] = useState(null);
  const [isDelivery, setIsDelivery] = useState(false);
  const [isPickUp, setIsPickup] = useState(false);
  const [restaurantImage, setRestaurantImage] = useState(null);

  const getRestaurantDetailsFunc = () => {
    getRestaurantDetailsById(restaurant.id)
      .then((res) => res.json())
      .then((data) => {
        setRestaurantDetails(data[0]);
        if (data[0].is_delivery === 1) setIsDelivery(true);
        if (data[0].is_pickup === 1) setIsPickup(true);
        return getDishesByRestaurantId(restaurant.id);
      })
      .then((res) => res.json())
      .then((data) => {
        setDishes(data);
        return getDishCategories();
      })
      .then((res) => res.json())
      .then((data) => {
        setDishCategories(data);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (restaurantName) data.append("name", restaurantName);
    if (location) data.append("location", location);
    if (description) data.append("description", description);
    if (address) data.append("address", address);
    if (email) data.append("email", email);
    if (phoneNo) data.append("phone_no", phoneNo);
    if (timings) data.append("timings", timings);
    if (isDelivery) data.append("is_delivery", 1);
    else data.append("is_delivery", 0);
    if (isPickUp) data.append("is_pickup", 1);
    else data.append("is_pickup", 0);
    if (restaurantImage) data.append("myFile", restaurantImage);
    updateRestaurant(data, 3).then((res) => {
      if (res.data === "Success") {
        getRestaurantDetailsFunc();
        alert("SUCCESS");
      }
    });
  };

  const onEditDishModalClose = () => {
    setEditDishModal(false);
    getRestaurantDetailsFunc();
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    setEditDishModal(true);
    setDishDetails(null);
  };

  const handleEditDish = (dish) => {
    setEditDishModal(true);
    setDishDetails(dish);
  };

  useEffect(() => {
    if (restaurant && restaurant.id) getRestaurantDetailsFunc();
    else window.location.href = "/restaurantlogin";
  }, []);

  return (
    <>
      <Header restaurantFlag={true} />
      {restaurantDetails ? (
        <>
          <div class="container">
            {restaurantDetails.restaurant_image ? (
              <img
                style={{ width: "100%", height: "200px" }}
                src={restaurantDetails.restaurant_image}
              />
            ) : null}
            <form onSubmit={onSubmit}>
              <div class="row">
                <div class="col-6">
                  <label
                    style={{
                      fontWeight: "bold",
                      marginTop: "15px",
                    }}
                  >
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter restaurant name"
                    defaultValue={restaurantDetails.name}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    required
                  />
                </div>
                <div class="col-6">
                  <label
                    style={{
                      fontWeight: "bold",
                      marginTop: "15px",
                    }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter location"
                    defaultValue={restaurantDetails.location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label
                  style={{
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                >
                  Description
                </label>
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Enter description"
                  defaultValue={restaurantDetails.description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div class="form-group">
                <label
                  style={{
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                >
                  Address
                </label>
                <textarea
                  class="form-control"
                  rows="2"
                  placeholder="Enter address"
                  defaultValue={restaurantDetails.address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div class="row">
                <div class="col-4">
                  <label
                    style={{
                      fontWeight: "bold",
                      marginTop: "15px",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter email"
                    defaultValue={restaurantDetails.email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class="col-4">
                  <label
                    style={{
                      fontWeight: "bold",
                      marginTop: "15px",
                    }}
                  >
                    Phone No.
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter phone no."
                    defaultValue={restaurantDetails.phone_no}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                  />
                </div>
                <div class="col-4">
                  <label
                    style={{
                      fontWeight: "bold",
                      marginTop: "15px",
                    }}
                  >
                    Timings
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter timings"
                    defaultValue={restaurantDetails.timings}
                    onChange={(e) => setTimings(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  style={{
                    marginTop: "18px",
                  }}
                  value="delivery"
                  onClick={() => setIsDelivery(!isDelivery)}
                  checked={isDelivery ? true : false}
                />
                <label
                  style={{
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                  class="form-check-label"
                  for="inlineCheckbox1"
                >
                  Delivery
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  style={{
                    marginTop: "18px",
                  }}
                  value="pickup"
                  checked={isPickUp ? true : false}
                  onClick={() => setIsPickup(!isPickUp)}
                />
                <label
                  style={{
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                  class="form-check-label"
                  for="inlineCheckbox2"
                >
                  Pickup
                </label>
              </div>
              <div class="form-group" style={{ marginTop: "18px" }}>
                <label
                  style={{
                    fontWeight: "bold",
                  }}
                  for="exampleFormControlFile1"
                  style={{ marginRight: "20px" }}
                >
                  <b>Upload Restaurant Image</b>
                </label>
                <input
                  type="file"
                  class="form-control-file"
                  onChange={(e) => setRestaurantImage(e.target.files[0])}
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <button type="submit" class="btn btn-success btn-md">
                  Save Changes
                </button>
              </div>
            </form>

            <p style={{ fontSize: "36px", textDecoration: "underline" }}>
              <b>Dishes/ Menu</b>
            </p>
            <p>
              <button class="btn btn-primary btn-sm" onClick={handleAddDish}>
                Add new dish
              </button>
            </p>
            <div class="container" style={{ padding: "25px", margin: 0 }}>
              <div class="row">
                {dishes &&
                  dishes.map((dish) => (
                    <div class="col-4">
                      <DishCard
                        dish={dish}
                        restaurantFlag={true}
                        getRestaurantDetailsFunc={getRestaurantDetailsFunc}
                        handleEditDish={handleEditDish}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
      <EditDishModal
        show={editDishModal}
        onHide={onEditDishModalClose}
        dish={dishDetails}
        dishCategories={dishCategories}
      />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  restaurant: state.login.restaurant,
});

export default connect(mapStateToProps)(RestaurantHome);
