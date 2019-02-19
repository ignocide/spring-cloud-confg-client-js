# spring cloud config client js

## Description

js for fetch or save a spring cloud client`s config

### Install

> yarn add spring-cloud-confg-client-js

or 

> npm install spring-cloud-confg-client-js

### Useage

```
import SpringCloudConfigClient from 'spring-cloud-config-client-js'

//initial
const springCloudConfigClient = new SpringCloudConfigClient({
    configServerUrl: "http://127.0.0.1:8888"
    // if you use server with spring security, set auth info
    // is optional
    auth: {
        username: "username",
        password: "password"
    }
})

springCloudConfigClient.fetch({
    name: 'configserver-client',
    //profile is optional 
    profile: 'dev'
}).then(console.log).catch(console.error)

//write file with absolute path
//save and will return config too
springCloudConfigClient.write(__dirname + '/config.json', {
    name: 'configserver-client',
    //profile is optional 
    profile: 'dev'
}).then(console.log).catch(console.error)

```

#### About Typescript

this project supply typescript