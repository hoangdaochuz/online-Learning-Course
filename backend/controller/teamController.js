const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel")

const getMembers = asyncHandler(async (req, res) => {
    const members = await Member.find()
    res.status(200).json(members)

})

const createMember = asyncHandler(async (req, res) => {
    // const {fullname,role } = req.fields;
    // const {avatar} = req.files;
    const {fullname,role,avatar} = req.body;
    if(!fullname || !avatar || !role){
        res.status(400)
        throw Error('Please enter full fields')
    }

    const member = await Member.create({
        fullname,
        avatar,
        role,
    })

    if(member){
        res.status(200).json({
           _id: member.id,
           fullname: member.fullname,
           avatar: member.avatar,
           role: member.role, 
        })
    }else{
        res.status(400)
        throw Error('Something went wrong')
    }
})


module.exports = {getMembers, createMember}