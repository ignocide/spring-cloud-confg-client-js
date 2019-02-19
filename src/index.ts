import axios, { AxiosInstance } from 'axios'
import * as fs from 'fs'

interface ApplicationProfile {
    name?: string,
    profile?: string,
}

interface SpringCloudConfigClientOptions extends ApplicationProfile {
    configServerUrl: string,
    auth?: {
        username: string,
        password: string,
    }
}

const writeFile = function (file: string, data: any) {
    data = JSON.stringify(data)
    return new Promise((res, rej) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                return rej(err)
            }
            return res()
        });
    })
}

class SpringCloudConfigClient {
    option: SpringCloudConfigClientOptions;
    private request: AxiosInstance;

    constructor(option: SpringCloudConfigClientOptions) {
        this.option = option;
        let requestOption: any = {};
        requestOption.baseURL = this.option.configServerUrl;
        if (option.auth) {
            requestOption.auth = {
                username: this.option.auth.username,
                password: this.option.auth.password,
            }
        }
        this.request = axios.create(requestOption);
    }

    async fetch(applicationProfile?: ApplicationProfile) {
        let name = this.option.name;
        let profile = this.option.profile;

        if (applicationProfile) {
            name = applicationProfile.name;
            profile = applicationProfile.profile;
        }

        let url = name;
        if (profile) {
            url += `-${profile}`
        }
        url += '.json';

        try {
            const result = await this.request.get(url);
            return result.data;
        } catch (e) {
            throw e
        }
    }

    async write(absolutFilePath: string, applicationProfile?: ApplicationProfile) {
        try {
            const data = await this.fetch(applicationProfile);
            await writeFile(absolutFilePath, data);
            return data;
        } catch (e) {
            throw e
        }
    }
}


export default SpringCloudConfigClient