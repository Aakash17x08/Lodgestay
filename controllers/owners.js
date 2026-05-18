const Listing = require("../models/listing");
const Booking = require("../models/booking");

module.exports.dashboard = async (req, res) => {
    // Find all listings owned by the current user
    const myListings = await Listing.find({ owner: req.user._id });
    const listingIds = myListings.map(listing => listing._id);

    // Find all bookings for those listings
    const myBookings = await Booking.find({ listing: { $in: listingIds } })
        .populate("user")
        .populate("listing")
        .sort({ _id: -1 });

    res.render("owner/dashboard.ejs", { myListings, myBookings });
};
