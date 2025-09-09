import { rateLimit } from 'express-rate-limit'
const limiter = rateLimit({
	windowMs: 1000, // 1second
	limit: 50
})

export default limiter;