const express = require('express');
const router = express.Router();

const User = require('../models/user.js')

//EVERYTHING STARTS WITH '/users/:userId/applications'

//GET '/user/:userId/applications'
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('applications/index.ejs',
            { applications: currentUser.applications })
    } catch (error){
        console.log(error)
        res.redirect('/')
    }
})


//GET '/users/:userId/applications/new
router.get('/new', (req, res) => {
    res.render('applications/new.ejs')
})


//GET '/users/:userId/applications/:applicationId'
router.get('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationId)
        res.render('applications/show.ejs', {
            application: application
        })
    } catch (error){
        console.log(error)
        res.redirect('/')
    }
    
})


//POST '/users/:userId/applications'
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.applications.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/applications`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


//DELETE '/users/:userId/applications/:applicationId'
router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.applications.id(req.params.applicationId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/applications`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

//PUT '/users/:userId/applications/:applicationId'
router.put('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationId)
        application.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


//GET '/users/:userId/applications/:applicationId/edit'
router.get('/:applicationId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationId)
        res.render('applications/edit.ejs', {
            application: application
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router