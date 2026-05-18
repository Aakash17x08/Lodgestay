const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isAdmin } = require("../middleware");
const adminController = require("../controllers/admin");

router.use(isLoggedIn, isAdmin);

router.get("/", (req, res) => {
    res.redirect("/admin/dashboard");
});

router.get("/dashboard", wrapAsync(adminController.dashboard));

router.get("/users", wrapAsync(adminController.manageUsers));
router.post("/users/:id/toggle-role", wrapAsync(adminController.toggleUserRole));
router.delete("/users/:id", wrapAsync(adminController.deleteUser));

router.get("/listings", wrapAsync(adminController.manageListings));

router.get("/bookings", wrapAsync(adminController.manageBookings));

module.exports = router;
