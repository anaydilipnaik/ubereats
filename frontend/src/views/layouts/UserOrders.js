import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { connect } from "react-redux";
import OrderDetails from "../../components/modals/OrderDetails";
import {
  getOrdersByUserIdFunc,
  getOrderDetailsByIdFunc,
  getFilteredOrdersByUserIdFunc,
} from "../../redux/actions/orderActions";
import { badgeClasses, Pagination } from "@mui/material";

const UserOrders = ({
  user,
  getOrdersByUserIdFunc,
  getOrderDetailsByIdFunc,
  getFilteredOrdersByUserIdFunc,
}) => {
  const [orders, setOrders] = useState(null);
  const [ordersSelected, setOrdersSelected] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [viewReceiptModal, setViewReceiptModal] = useState(false);
  const [pageCount, setPageCount] = useState(null);

  const getOrdersFunc = () => {
    getOrdersByUserIdFunc(user._id, user.token, setOrders, setPageCount);
  };

  const onModalClick = (orderId) => {
    getOrderDetailsByIdFunc(
      orderId,
      user.token,
      setOrderDetails,
      setViewReceiptModal
    );
    orders.map((order) => {
      if (order._id === orderId) setOrdersSelected(order);
    });
  };

  const onModalClose = () => {
    setViewReceiptModal(false);
  };

  const onFilterClick = (e) => {
    e.preventDefault();
    let data = {};
    data.userId = user._id;
    data.orderStatus = e.target.value;
    if (e.target.value === "all") getOrdersFunc();
    else getFilteredOrdersByUserIdFunc(data, user.token, setOrders);
  };

  useEffect(() => {
    getOrdersFunc();
  }, []);

  return (
    <>
      <Header />
      <div class="container">
        <p style={{ fontSize: "36px", textDecoration: "underline" }}>
          Orders Page
        </p>
        <div class="row" style={{ marginBottom: "40px" }}>
          <div class="col-2">
            <b>Filter by Delivery Status:</b>
            <select class="form-control" onChange={onFilterClick} required>
              <option value="all">All Orders</option>
              <option value="OR">Order Received</option>
              <option value="PR">Preparing</option>
              <option value="OTW">On the Way</option>
              <option value="RPU">Ready for Pickup</option>
              <option value="DL">Delivered</option>
              <option value="PU">Picked Up</option>
              <option value="CA">Cancelled</option>
            </select>
          </div>
        </div>
        {orders && orders.length > 0 ? (
          orders.map((item) => (
            <>
              <div class="row">
                <div class="col-12">
                  <p>
                    <b
                      style={{
                        color: "black",
                        fontSize: "24px",
                      }}
                    >
                      {item.restaurantName +
                        " (" +
                        item.restaurantLocation +
                        ")"}
                    </b>
                  </p>
                </div>
                <div class="col-12">
                  <p>
                    {item.deliveryType === "DL"
                      ? item.orderStatus === "OR"
                        ? "Order Received"
                        : item.orderStatus === "PR"
                        ? "Preparing"
                        : item.orderStatus === "OTW"
                        ? "On the Way"
                        : item.orderStatus === "DL"
                        ? "Delivered"
                        : item.orderStatus === "CA"
                        ? "Cancelled"
                        : null
                      : item.deliveryType === "PU"
                      ? item.orderStatus === "OR"
                        ? "Order Received"
                        : item.orderStatus === "PR"
                        ? "Preparing"
                        : item.orderStatus === "PUR"
                        ? "Pick Up Received"
                        : item.orderStatus === "PU"
                        ? "Picked Up"
                        : item.orderStatus === "CA"
                        ? "Cancelled"
                        : null
                      : null}
                  </p>
                </div>
                <div class="col-12">
                  <p>
                    {item.orderCount} items for ${item.total} on {item.created}.{" "}
                    <a
                      onClick={() => onModalClick(item._id)}
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      View Receipt
                    </a>
                  </p>
                </div>
              </div>
              <hr />
            </>
          ))
        ) : (
          <p style={{ fontSize: "24px" }}>Sorry, no orders found</p>
        )}
        <Pagination count={pageCount} color="primary" />
      </div>
      <Footer />
      <OrderDetails
        show={viewReceiptModal}
        onHide={onModalClose}
        orderDetails={orderDetails}
        orders={ordersSelected}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps, {
  getOrdersByUserIdFunc,
  getOrderDetailsByIdFunc,
  getFilteredOrdersByUserIdFunc,
})(UserOrders);
