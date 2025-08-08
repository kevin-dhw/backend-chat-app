import express from 'express'
import { createTestData, testList, update, delItem } from '../controllers/testController.js'

const testRouter = express.Router()

testRouter.post('/create', createTestData)
testRouter.post('/list', testList)
testRouter.post('/update', update)
testRouter.post('/delete', delItem)

export default testRouter