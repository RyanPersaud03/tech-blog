const express = require('express');
const router = express.Router();
const {User,Posts, Likes, follow} = require("../models");
const userRoutes = require('./userRoutes');
const likesRoutes= require('./likesRoutes');
const postRoutes = require('./postsRoutes');
const autRoutes = require('./autRoutes');
const followRoutes= require("./followRoutes");
const htmlRoutes= require("./htmlRoutes");
const commentRoutes = require("./commentRoutes");
const bcrypt = require("bcrypt");
const messageRoutes = require("./messageRoutes");
const storyRoutes = require("./storyRoutes");


router.use("/", htmlRoutes);
router.use("/api/users",userRoutes);
router.use("/api/likes",likesRoutes);
router.use("/api/posts",postRoutes);
router.use("/api/",autRoutes);
router.use("/api/follow", followRoutes);
router.use("/api/comments", commentRoutes);
router.use("/api/message", messageRoutes);
router.use("/api/story", storyRoutes);



module.exports = router;