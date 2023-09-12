const execSync = require('child_process').execSync
const dotenv = require('dotenv')
dotenv.config()

const services = [
    {
        name: 'auth-service-db',
        url: 'https://github.com/coda-platform/auth-service-db'
    },
    {
        name: 'auth-service',
        url: 'https://github.com/louisfb01/auth-service'
    },
    {
        name: 'hub-cache-db',
        url: 'https://github.com/coda-platform/hub-cache-db'
    },
    {
        name: 'hub-api',
        url: 'https://github.com/louisfb01/hub-api'
    },
    {
        name: 'dashboard-api',
        url: 'https://github.com/louisfb01/dashboard-api'
    },
    {
        name: 'dashboard-app',
        url: 'https://github.com/louisfb01/dashboard-app'
    },
    {
        name: 'notebook-app',
        url: 'https://github.com/louisfb01/notebook-app'
    },
]

execSync(`caprover logout -n ${process.env.CAPROVER_NAME} || true`)

for (const service of services) {
    execSync(
        `rm -rf ${service.name} 2> /dev/null || true && ` +
        `git clone ${service.url} && ` +
        `cd ${service.name} && ` +
        `cp ../envs/${service.name}.env .env && ` +
        `echo "\n" >> .env && ` +
        `cat ../.env >> .env && ` +
        `npm install && ` +
        `npm run caprover:setup && ` +
        `npm run caprover:deploy && ` +
        `cd .. && rm -rf ${service.name}`, { stdio: 'inherit' })
}