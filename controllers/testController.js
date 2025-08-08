import Test from "../models/test.js";
// import { isEmpty } from "../lib/utils";

export const testList = async (req, res) => {
    try {
        const list = await Test.find()
        res.json({code: 200, success: true, data: list, msg: 'success'})
    } catch (err) {
        res.json({code: 0, success: false, msg: err.msg})
    }
}

export const createTestData = async (req, res) => {
   try {
    const {name, age} = req.body
    if (!name || !age) {
       res.json({code: 0, success: false, msg: 'please check the data'})
    }
    const test = await Test.findOne({name})
    if (test) {
        res.json({code: 0, success: true, msg: 'the test exist'})
    }
    const newData = await Test.create({
        name, age
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

