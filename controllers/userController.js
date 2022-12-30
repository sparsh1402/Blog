import Post from '../models/Post.js';  //calling model
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt' //for hashing the passwors to protect from hackers

import User from '../models/User.js';
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var checkDelete = 0;
class UserController {
    static home = (req, res) => {
        checkDelete = 0;
        Post.find({}, function (err, posts) {
            res.render("home", {
                startingContent: homeStartingContent,
                posts: posts
            });
        });
    };
    
    static compose = (req, res) => {
        // console.log("Getting compose");
        res.render("compose");
    };

    static composePage = async (req, res) => {
        console.log(req.body);
        const uemail = req.body.emailAddress;
        const upassword = req.body.password;
         const result = await UserModel.findOne({ email: req.body.emailAddress });
        
        if (result != null) {
            const isMatch = await bcrypt.compare(upassword, result.password);
            if (uemail == result.email && isMatch) {
                const post = new Post({
                    _id: req.body._id,
                    title: req.body.postTitle,
                    content: req.body.postBody,
                    email: req.body.emailAddress
                });

                post.save(function (err) {
                    if (!err) {
                        res.redirect("/");
                    };
                });
                    
            } else {
                res.send("<h1>Password is wrong</h1>");
            }
        }
        else {
            res.send("<h1>Email is wrong</h1>")
        }
    
        // const post = new Post({
        //     _id: req.body._id,
        //     title: req.body.postTitle,
        //     content: req.body.postBody,
        //     email: req.body.emailAddress
        // });

        //  post.save(function(err){
        // if (!err){
        //     res.redirect("/");
        //     };
        // });

    }

    static deletePost = (req, res) => {
        // res.send("Delete has been called");
        console.log("Hey");
        console.log(req.params.postId);
        console.log(req.body);
  
        const requestedPostId = req.params.postId;
        // if (req.body.button === "delete") {
            Post.deleteOne({ _id: requestedPostId }, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Successfully deleted");
                     const result = UserModel.findOne({ email: req.body.button });
                    Post.find({ email: req.body.button }, (err, posts) => {
                        res.render("userPost", { posts: posts , societyName : result.name  });
                     })
                }
            });
        // }
        // else {
 
        // }
    };

    static displayPost = (req, res) => {
        // console.log(req.params.postId);
        const requestedPostId = req.params.postId;
        console.log(req.body);

        Post.findOne({ _id: requestedPostId }, function (err, post) {
            res.render("post", {
                id: requestedPostId,
                title: post.title,
                content: post.content,
                check: checkDelete,
                email: post.email
            });
        });

    };

    static about = (req, res) => {
        res.render("about", { aboutContent: aboutContent });
    };

    static contact = (req, res) => {
        res.render("contact", { contactContent: contactContent });
    };


    static signin = (req, res) => {
        res.render("signin");
    };

    // static verifyLogin = async (req, res) => {
    //     try {
    //         const uemail = req.body.emailAddress;
    //         const upassword = req.body.password;
    //         const result = await UserModel.findOne({ email: req.body.emailAddress });
    //         if (result != null) {
    //             if (uemail == result.email && upassword == result.password) {
    //                 console.log(result);
    //                 res.redirect("/");
    //             } else {
    //                 res.send("<h1>Email or password is wrong</h1>");
    //             }
    //         }
    //         else {
    //             res.send("<h1>Your are not a registered user</h1>");
    //         }
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    static userPosts = async (req, res) => {
        
    }
     static verifyLogin = async (req, res) => {
        try {
            const uemail = req.body.emailAddress;
            const upassword = req.body.password;
            const result = await UserModel.findOne({ email: req.body.emailAddress });
            if (result != null) {
                const isMatch = await bcrypt.compare(upassword, result.password);
                
                if (uemail == result.email && isMatch) {
                    // console.log(result);
                    checkDelete = 1;
                    Post.find({ email: uemail }, (err, posts) => {
                        res.render("userPost", { posts: posts , societyName : result.name });
                     })
                    
                } else {
                    res.send("<h1>Email or password is wrong</h1>");
                }
            }
            else {
                res.send("<h1>Your are not a registered user</h1>");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    static registration = (req, res) => {

        res.render("registration");
    };

    static createUserDoc = async (req, res) => {
        try {
            //creating new doccument using models
            const exist = await UserModel.findOne({ email: req.body.emailAddress });
            console.log(exist);
            if (exist) {
                res.send("<h1>Society already registered</h1>")
            }
            else {
                console.log(req.body);
                const doc = new UserModel({
                    name: req.body.societyName,
                    email: req.body.emailAddress,
                    password: req.body.password,
                });
                // await doc.save();
                res.redirect('/login');
            }

            
        } catch (error) {
            console.log(error);
        }
    };

    static createUserDoc = async (req, res) => {
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        try {
            //creating new doccument using models
            const doc = new UserModel({
                name: req.body.societyName,
                email: req.body.emailAddress,
                password: hashPassword
            });
            await doc.save();
            res.redirect('/login');
        } catch (error) {
            console.log(error);
        }
    }

}
export default UserController;