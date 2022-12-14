const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Note = require("../models/Note");
const Account = require("../models/Account");



module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const notes = await Note.find( {company: req.user.userCompany } );
      res.render("profile.ejs", { posts: posts, notes: notes, user: req.user, userCompany:req.user.userCompany});
    } catch (err) {
      console.log(err);
    }
  },
  getChangePlant: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const notes = await Note.find( {company: req.user.userCompany } );
      const account = await Account.findById(req.params.id);
      res.render("changeplant.ejs", { post: post, account: account, notes: notes, user: req.user, userCompany:req.user.userCompany});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find({ account: req.params.id}).sort({ locationNumber: "asc" }).lean();
       const account = await Account.findById(req.params.id);
      res.render("feed.ejs", { posts: posts, user: req.user, account_id: req.params.id, account: account  });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const notes = await Note.find({ post: req.params.id}).sort({ dateAdded: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, notes: notes, post_id: req.params.id });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      //format the input value to covert text to title case and remove whitespace from both ends 
      // req.body.company = req.body.company.trim();
      // req.body.company = req.body.company.charAt(0).toUpperCase() + req.body.accountName.substr(1).toLowerCase();
      

      await Post.create({
        company: req.body.company,
        account: req.body.account,
        building: req.body.building,
        floor: req.body.floor,  
        locationNumber: req.body.locationNumber,
        lightLevel: req.body.lightLevel,
        currentPlant: req.body.currentPlant,
        plantSize: req.body.plantSize,
        plantImage: result.secure_url,
        currentTechnician: req.user.id,
        cloudinaryId: result.public_id,
      });
      console.log("Post has been added!");
      console.log(req.body);
      res.redirect(`/feed/${req.body.account}`);
    } catch (err) {
      console.log(err);
    }
  },
  updatePost: async (req, res) => {
   try {
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { 
                  currentPlant: req.body.plant,
                  plantSize: req.body.plantSize,
                  plantImage: result.secure_url,
                  cloudinaryId: result.public_id,
                }
        }
      );
      console.log("Plant has been updated.");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updatePostServiceDate: async (req, res) => {
   try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $currentDate: { lastServicedDate: true},
        },
      );
      console.log("New service timestamp logged.");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updateAllPostServiceDates: async (req, res) => {
   try {
      await Post.updateMany(
        { account: req.params.id },
        {
          $currentDate: { lastServicedDate: true},
        },
      );
      console.log("New service timestamps logged.");
      console.log(req.params.id);
      res.redirect(`/feed/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect(`/accounts/${post.account}`);
    } catch (err) {
      res.redirect(`/accounts/${post.account}`);
    }
  },

};
