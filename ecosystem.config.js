module.exports = {
    apps : [
        {
            name: 'NuxtAppShop',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: 'yarn',
            args: 'start'
        }
    ],
}