import Test from "../models/test.js";
import TestDetail from "../models/testdetail.js";
import cloudinary from "../lib/cloudinary.js";

export const testList = async (req, res) => {
    try {
        const list = await Test.find()
        for (let item of list) {
          const query = {_id: item._id}
            const detail = TestDetail.find(query)
            item.detail = detail
            item.detail2 = '222'
        }
        res.json({code: 200, success: true, data: {list: list}, msg: 'success'})
    } catch (err) {
        res.json({code: 0, success: false, msg: err.msg})
    }
}

export const createTestData = async (req, res) => {
   try {
    const {name, age, img} = req.body
    if (!name || !age || !img) {
       res.json({code: 0, success: false, msg: 'please check the data'})
    }
    const imgUrl = await cloudinary.uploader.upload(img)
    const test = await Test.findOne({name})
    if (test) {
        res.json({code: 0, success: true, msg: 'the test exist'})
    }
    const newData = await Test.create({
        name, age, img: imgUrl
    })
    res.json({code: 200, success: true, data: newData, msg: 'please check the data'})
   } catch(err) {
       res.json({code: 0, success: false, msg: err.msg})
   }
}

export const update = async (req, res) => {
    try {
        const {id, name, age} = req.body
        if (!id) {
            res.json({code: 0, success: false, msg: 'id doesnt exist'})
        }
        let param = {name, age}
        const updateItem = await Test.findByIdAndUpdate(id, param)
        res.json({code: 0, success: true, data: updateItem, msg: 'update item successfully'})
    } catch (err) {
        res.json({code: 0, success: false, msg: err.msg})
    }
}

export const delItem = async (req, res) => {
  try {
    const {id} = req.body
    if (!id) {
        res.json({code: 0, success: false, msg: 'id doesnt exist'})
    }
    await Test.findByIdAndDelete(id)
    res.json({code: 0, success: true, msg: 'delete item successfully'})
  } catch(err) {
    res.json({code: 0, success: false, msg: err.msg})
  }
}

// detail
export const testDetail = async (req, res) => {
    try {
        const { id, job, img } = req.body
        if (!id) {
            res.json({code: 0, success: false, msg: 'id doesnt exist'})
        }
        const param = {
            id, job, img
        }
        await Test.create(param)
        res.josn({code: 200, success: true, msg: 'add data successfully'})
    } catch(err) {
        res.json({code: 0, success: false, msg: err.msg})
    }
}

export const updateImg = async (req,res) => {
    try {
      const {img, id} = req.body
      const imgUrl = await cloudinary.uploader.upload(img)
      await Test.findByIdAndUpdate(id, {img: imgUrl.secure_url}, {new: true})
      res.json({success: true, msg: 'update img successfully'})
    } catch(err) {
      res.json({code: 0, success: false, msg: err.msg})
    }
}