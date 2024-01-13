
const User = require('./User');
const Posts = require('./posts');
const comment = require("./comments");


comment.belongsTo(Posts, {
    foreignKey:`post_id`,
})

Posts.hasMany(comment,{
    foreignKey:`post_id`,
})

User.hasMany(comment,{
    foreignKey:`user_id`,
})
comment.belongsTo(User,{
    foreignKey:`user_id`,
})

Posts.hasMany(Likes, {
    foreignKey:'post_id',
});
User.hasMany(Likes, {
    foreignKey:'user_id',
});

Posts.belongsTo(User, {
    foreignKey:'user_id',
});
User.hasMany(Posts,{
    foreignKey:'user_id',
});

User.belongsToMany(User, {
    through: "follow",
    as: "followers",
    foreignKey: "followed_user_id"
});
User.belongsToMany(User,  {
    through: 'follow',
    as: "following",
    foreignKey: "following_user_id"
})

module.exports = {
    User,
    Posts,
};