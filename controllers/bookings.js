const Listing = require("../models/listing");
const Booking = require("../models/booking");

module.exports.createBooking = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let { checkIn, checkOut } = req.body.booking;
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    if (checkInDate < today) {
        req.flash("error", "You cannot book for a past date!");
        return res.redirect(`/listings/${id}`);
    }

    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (diffDays <= 0) {
        req.flash("error", "Check-out date must be after check-in date!");
        return res.redirect(`/listings/${id}`);
    }

    // Check for overlapping bookings
    const existingBookings = await Booking.find({
        listing: id,
        status: { $ne: "Cancelled" }, // Ignore cancelled bookings
        $or: [
            {
                checkIn: { $lt: checkOutDate },
                checkOut: { $gt: checkInDate }
            }
        ]
    });

    if (existingBookings.length > 0) {
        req.flash("error", "This Lodge is already booked for the selected dates!");
        return res.redirect(`/listings/${id}`);
    }

    const totalPrice = diffDays * listing.price;
    const newBooking = new Booking({
        listing: id,
        user: req.user._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalPrice: totalPrice,
    });

    await newBooking.save();
    req.flash("success", "Lodge booked successfully!");
    res.redirect("/profile");
};

module.exports.cancelBooking = async (req, res) => {
    let { id, bookingId } = req.params;
    let booking = await Booking.findById(bookingId);
    if (!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect("/profile");
    }
    
    // Ensure the booking belongs to the current user or is cancelled by admin
    if (!booking.user.equals(req.user._id) && req.user.role !== "admin") {
        req.flash("error", "You do not have permission to cancel this booking!");
        return res.redirect("/profile");
    }

    booking.status = "Cancelled";
    await booking.save();
    req.flash("success", "Booking has been cancelled successfully.");
    res.redirect("/profile");
};
