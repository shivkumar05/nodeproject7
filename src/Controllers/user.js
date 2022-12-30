const battingModel = require("../Models/battingModel")
const bowlingModel = require("../Models/bowlingModel")
const wicketModel = require("../Models/wicketModel")
const filterBowling = require("../Models/filterBowling")
const filterBatting = require("../Models/filterBatting")
const bow_batModel = require("../Models/bow_batModel")
const userModel = require("../Models/userModel")
const drillModel = require("../Models/drillsModel")
const categoryModel = require("../Models/categoryModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const curriculumModel = require("../Models/curriculumModel")



const createUser = async function (req, res) {
    try {
        let data = req.body;
        let { name, phone, join_as, signup_as, email, password } = data

        if (await userModel.findOne({ phone: phone }))
            return res.status(400).send({ message: "Phone already exist" })

        if (await userModel.findOne({ email: email }))
            return res.status(400).send({ message: "Email already exist" })

        const encryptedPassword = bcrypt.hashSync(password, 12)
        req.body['password'] = encryptedPassword;

        let savedData = await userModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
};

const userLogin = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data

        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).send({
                status: false,
                msg: "Email and Password is Invalid"
            })
        }

        let compared = await bcrypt.compare(password, user.password)
        if (!compared) {
            return res.status(400).send({
                status: false,
                message: "Your password is invalid"
            })
        };

        let token = jwt.sign({
            userId: user._id,
        }, "project",

        )
        return res.status(200).send({
            status: true,
            msg: "User login successfull",
            data: {
                userId: user._id,
                name: user.name,
                phone: user.phone,
                join_as: user.join_as,
                signup_as: user.signup_as,
                email: user.email,
                password: user.password,
                token: token
            }
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
};

const createBattings = async function (req, res) {
    try {
        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create batting"
            })
        }
        const battingCreated = await battingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Battings created successfully",
            data: battingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
// ========================================================================================

const createBowlings = async function (req, res) {
    try {

        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Bowlings"
            })
        }
        const bowlingCreated = await bowlingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Bowling created successfully",
            data: bowlingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
// ==============================================================================
const createWickets = async function (req, res) {
    try {

        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Wickets"
            })
        }
        const wicketCreated = await wicketModel.create(data)
        return res.status(201).send({
            status: true,
            message: "Wicket created successfully",
            data: wicketCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//=============================================================================


const category = async function (req, res) {
    try {
        let data = req.body;

        let category = await categoryModel.create(data);
        let obj = {}
        obj["id"] = category.id
        obj["category"] = category.category

        return res.status(201).send({
            message: "category created successfully",
            data: obj
        })

    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

const getCategory = async function(req, res){
    try{
      let body = req.body;

      const Category = await categoryModel.find(body).select({ id: 1, category: 1, _id: 0 });

      return res.status(200).send({
          status: true,
          message: "success", 
          data: Category
      })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//===================================================================
const battingTags = async function (req, res) {
    try {
        let data = req.body;

        const filterBat = await filterBatting.create(data)

        let obj = {}
        obj["backfoot"] = filterBat.backfoot
        obj["cover"] = filterBat.cover
        obj["flickshot"] = filterBat.flickshot
        obj["frontfoot"] = filterBat.frontfoot
        obj["leaving_ball"] = filterBat.leaving_ball
        obj["on_drive"] = filterBat.on_drive
        obj["pullshot"] = filterBat.pullshot
        obj["square_cut"] = filterBat.square_cut
        obj["straight"] = filterBat.straight
        obj["sweepshot"] = filterBat.sweepshot

        return res.status(201).send({
            status: true,
            message: "batting tags created successfully",
            data: obj
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

const getBattings = async function (req, res) {
    try {
        let body = req.query
        const getBat = await filterBatting.findOne({id:1}).select({id:0, _id: 0, createdAt:0, updatedAt:0, __v:0 });
        return res.status(200).send({
            status: true,
            message: 'Success',
            data: getBat
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//=======================================================

const bowlingTags = async function (req, res) {
    try {
        let data = req.body;

        const filterBow = await filterBowling.create(data)

        let obj = {}
        obj["fast_bowling"] = filterBow.fast_bowling
        obj["leg_spin"] = filterBow.leg_spin
        obj["off_spin"] = filterBow.off_spin
        
        return res.status(201).send({
            status: true,
            message: "bowling tags created successfully",
            data: obj
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

const getBowlings = async function (req, res) {
    try {
        let body = req.query
        const getBow = await filterBowling.find(body).select({ id:0,_id: 0, createdAt:0, updatedAt:0, __v:0 });
        return res.status(200).send({
            status: true,
            message: 'Success',
            data: getBow
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//========================================================================

const getTags = async function(req, res){
    try{
         let body = req.body;

          let batTags = await filterBatting.find(body).select({ id:0,_id: 0, createdAt:0, updatedAt:0, __v:0 });
          let bowTags = await filterBowling.find(body).select({ id:0,_id: 0, createdAt:0, updatedAt:0, __v:0 });

         return res.status(200).send({
            status: true,
            message: 'Success',
            batTags: batTags,
            bowTags: bowTags
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}
//==========================================================

const bow_bat = async function (req, res) {
    try {
        let data = req.body;
        data = JSON.parse(JSON.stringify(data));

        const actionCreated = await bow_batModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Success",
            data: actionCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//===================================================

const createDrills = async function (req, res) {
    try {
        let data = req.body;

        let { drills, date, time } = data;

        if (await drillModel.findOne({ date: date, time: time }))
            return res.status(400).send({ status: false, message: "You already have a routine set for this time" })

        const drillsCreated = await drillModel.create(data)

        return res.status(201).send({
            message: "Success",
            data: drillsCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//=======================================================

const getRoutine = async function (req, res) {
    try {
        let data = req.body;

        const getDrills = await drillModel.find(data).sort({ time: data.time })

        return res.status(200).send({
            status: true,
            data: getDrills
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

module.exports = { createUser, userLogin, createBattings, createBowlings, createWickets, bowlingTags, getBowlings, battingTags, getBattings, bow_bat, createDrills, getRoutine, category, getCategory, getTags }