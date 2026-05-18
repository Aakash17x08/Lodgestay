const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");

module.exports.index = async (req, res) => {
  const { search, category } = req.query;
  let query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } }
    ];
  }
  if (category && category !== "undefined") {
    query.category = category;
  }
  const { minPrice, maxPrice } = req.query;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  const allListings = await Listing.find(query);
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  
  // Find all active (non-cancelled) bookings for this listing
  const activeBookings = await Booking.find({
    listing: id,
    status: { $ne: "Cancelled" }
  });

  res.render("listings/show.ejs", { listing, activeBookings });
};

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  if (req.files) {
    newListing.image = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
  }
  await newListing.save();
  req.flash("success", "Successfully made a new listing!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }

  listing.set(req.body.listing);

  if (typeof req.files !== "undefined" && req.files.length > 0) {
    const newImages = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    // Handle legacy image structure or init array
    if (!Array.isArray(listing.image)) {
      if (listing.image && listing.image.url) {
        listing.image = [listing.image];
      } else {
        listing.image = [];
      }
    }

    listing.image.push(...newImages);
  }

  if (req.body.deleteImages && req.body.deleteImages.length > 0) {
    listing.image = listing.image.filter(img => !req.body.deleteImages.includes(img.filename));
  }

  await listing.save();
  req.flash("success", "Successfully updated a listing!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a listing!");
  console.log(deletedListing);
  res.redirect("/listings");
};
