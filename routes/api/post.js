const { Router } = require('express');
const router = new Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Initialize Post Model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Require validation
const validatePostInput = require('../../validation/post');


// @route   Get api/movies
// @desc    Test movies route
// @access  Public
router.get('/post', (req, res) => { res.json({msg: 'Post works!'})});

// @route   GET api/posts
// @desc    Fetch all posts
// @access  Public
router.get('/posts', (req, res) => {
    Post.find()
        .sort({ data: -1 })
        .then(posts => res.json(posts))
        .catch(error => res.status(404).json({ error: 'No posts found!' }));
});

// @route   GET api/posts/:id
// @desc    Fetch post by ID
// @access  Public
router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(error => res.status(404).json({ error: 'No post found with that id!' }));
});


// @route   Post api/posts
// @desc    Create or update post
// @access  Private
router.post('/post', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput( req.body ) ;

        if(!isValid){
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            text:   req.body.text,
            name:   req.body.name,
            avatar: req.body.avatar,
            user:   req.user.id
        });

        newPost.save()
            .then(post => res.json(post))
            .catch(error => res.status(400).json(error));
    });

// @route   Delete api/posts
// @desc    Delete specific post by id
// @access  Private
router.delete('/post/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if(post.user.toString() !== req.user.id){
                            return res.status(401).json({ error: 'User not authorized!' })
                        }
                        post.remove()
                            .then(() => res.json({ success: true, message: 'Post successfully deleted!' }))
                            .catch(error => res.status(404).json({ error: 'No post to delete' }));
                    })
            })
    });

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/posts/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                   if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                       return res.status(400).json({ alreadyliked: 'User already liked this post' });
                   }
                   post.likes.unshift({ user: req.user.id });

                   post.save().then(post => res.json(post));
                })
        })
    });

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/posts/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                   if(post.likes.filter(like => like.user.toString() === req.user.id).length == 0){
                       return res.status(400).json({ notliked: 'You have not yet liked this post' });
                   }
                   
                // Get remove index
                   const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);

                    post.likes.splice(removeIndex, 1);
                    post.save().then(post => res.json(post));

                });
        })
    });

// @route   POST api/posts/comment/:id
// @desc    Add comment to a post
// @access  Private
router.post('/posts/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validatePostInput( req.body ) ;

    if(!isValid){
        return res.status(400).json(errors);
    }
    
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            post.save().then(post => res.json(post)).catch(error => res.status(404).json({ error: 'No post found' }));
        })
});

// @route   Delete api/posts/comment/:id/:comment_id
// @desc    Remove comment to a post
// @access  Private
router.delete('/posts/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    Post.findById(req.params.id)
        .then(post => {
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({ error: 'Comment does not exist!' });
            }

            // Get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            post.comments.splice(removeIndex, 1);

            post.save().then(post => res.json(post));
        })
});
module.exports = router; 