
const Auth = require("aws-amplify").Auth

module.exports = {
    Auth: {
        identityPoolId: "eu-central-1:6806ec5b-5b09-4b71-9a49-c5636243baf3",
        region: "eu-central-1",
        userPoolId: "eu-central-1_riYRWIf8j",
        userPoolWebClientId: "68vf3m0stna9mvm3a39268bi1f"
    },
    API: {
        endpoints: [
            {
                name: "testApi",
                endpoint: "https://ggwcx2bht4.execute-api.eu-central-1.amazonaws.com/development/getTemperature",
                custom_header: async () => {
                    let token = (await Auth.currentSession()).idToken.jwtToken
                    console.log("auth token", token)
                    return { Authorization: token }
                }
            }
        ]
    }
}
