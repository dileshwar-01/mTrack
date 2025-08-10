import IORedis from 'ioredis'

const redis = new IORedis({
    host: 'redis-service',
    port: 6379,
    maxRetriesPerRequest: null
})

export default redis