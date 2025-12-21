const Listing = require('../models/listing');

module.exports.Index = async (req,res)=>{
   let {category} = req.query;
   let allListings;
   if(category){
      allListings = await Listing.find({category:category});
      console.log(allListings);
      if(!allListings.length){
         req.flash("error","No listings found in this category.");
         return res.redirect("/listings");
      }
   }
   else{
     allListings = await Listing.find();
   }
   res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.createListing = async(req,res)=>{
   let url = req.file.path;
   let filename = req.file.filename;
   const newListing = new Listing(req.body.listing); 
   newListing.owner = req.user._id;
   newListing.image = {url,filename};
   await newListing.save();
   req.flash("success","New Listing Created");
   res.redirect("/listings");
};

module.exports.showListing = async(req,res,next)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
                    .populate({path: "reviews",populate : {path : "author"}})
                    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    let api_key = process.env.MAP_API_KEY;

    res.render("listings/show",{listing,api_key});
};

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing},{runValidators:true});
    if(typeof req.file !== "undefined"){
       let url = req.file.path;
       let filename = req.file.filename;
       listing.image = {url,filename};
       await listing.save();
    }
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.renderEditForm = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    let ImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs",{listing,ImageUrl});
};

module.exports.destroyListing = async(req,res)=>{
   let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success","Listing deleted successfully");
   res.redirect("/listings");
};