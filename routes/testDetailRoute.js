import express from 'express'
import { createTestDetail } from '../controllers/testDetailController.js'

const testDetailRoute = express.Router()

testDetailRoute.post('/create', createTestDetail)

export default testDetailRoute