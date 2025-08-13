import TestDetail from "../models/testdetail.js";

export const testDetailList = async (req, res) => {
    
}

export const createTestDetail = async (req, res) => {
    try {
      const {_id, job, school} = req.body
      const data = await TestDetail.create({
        testId: _id, job, school
      })
      res.json({success: true, data, msg: 'create successfully'})
    } catch (err) {
      res.json({success: false, msg: 'err', message: 'error'})
    }
}

