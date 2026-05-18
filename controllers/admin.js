const User = require("../models/user");
const Listing = require("../models/listing");
const Review = require("../models/review");
const Booking = require("../models/booking");

module.exports.dashboard = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalBookings = await Booking.countDocuments();
    
    // Get recent activity
    const recentUsers = await User.find().sort({ _id: -1 }).limit(5);
    const recentListings = await Listing.find().populate("owner").sort({ _id: -1 }).limit(5);

    res.render("admin/dashboard.ejs", { 
        totalUsers, totalListings, totalReviews, totalBookings,
        recentUsers, recentListings
    });
};

module.exports.manageUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.render("admin/users.ejs", { allUsers });
};

module.exports.toggleUserRole = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.username === "admin") {
        req.flash("error", "Main admin role cannot be changed!");
        return res.redirect("/admin/users");
    }
    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();
    req.flash("success", `Role updated for ${user.username}`);
    res.redirect("/admin/users");
};

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.username === "admin") {
        req.flash("error", "Cannot delete the main admin!");
        return res.redirect("/admin/users");
    }
    await User.findByIdAndDelete(id);
    req.flash("success", "User deleted successfully");
    res.redirect("/admin/users");
};

module.exports.manageListings = async (req, res) => {
    const allListings = await Listing.find({}).populate("owner");
    res.render("admin/listings.ejs", { allListings });
};

module.exports.manageBookings = async (req, res) => {
    const allBookings = await Booking.find({})
        .populate("user")
        .populate("listing")
        .sort({ _id: -1 });
    res.render("admin/bookings.ejs", { allBookings });
};

