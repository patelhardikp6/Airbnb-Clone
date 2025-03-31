const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title : {
        type:String,
        required:true
    },
    description:String,
    image : {
        url:String,
        filename:String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        },
    ], 
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",    
    },
    geometry:{
        type: {
            type:String,
            enum:['Point'],
            requires:true
        },
        coordinates:{
            type:[Number],
            required:true,
        },
    },
});
// category:{
    //     type:String,
    //     enum : ["Mountains","Trending","Iconic Cities","Castles","Pools","Camping","Farms","Snow"],
    // },

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    } 
});


const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;