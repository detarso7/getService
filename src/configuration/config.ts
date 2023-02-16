export default {
    port: process.env.PORT || 3000,
    secretyKey: process.env.SECRETYKEY || '85869072-d42b-4cd8-96f5-24d43e78ee15',
    publicRoutes: process.env.PUBLICROUTES || [
        'users/create',
        'users/auth'
    ]
}