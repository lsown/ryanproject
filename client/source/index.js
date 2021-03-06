"use strict"

const React = require("react")
const ReactDOM = require("react-dom")
const MobxReact = require("mobx-react")

import ReactToggle from 'react-toggle'
import RCSwitch from 'rc-switch';
import Amplify from "aws-amplify"
import API from "@aws-amplify/api"

const config = require("aws-exports.js")

import { withAuthenticator } from "aws-amplify-react"

import { Auth } from 'aws-amplify';

//console.log(Amplify)

Amplify.configure(config)

require("./index.less") 
require("react-toggle/style.css")
require("rc-switch/assets/index.css")

  
@MobxReact.observer class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            temperature: "not queried",
            aquaFlag: "not queried",
            takeupFlag: "not queried",
            feedFlag: "not queried",
            overflowFlag: "not queried",
            feedPump: undefined,
            takeupPump: "not queried",
            disabled: false //button toggle
        }
        /*button toggle code*/
        Auth.currentSession()
            .then((data) => {
                console.log(data)
                this.idToken = data.idToken
            })
            .catch(err => console.log(err));        

    }

    onChange(value, event) {
        console.log(`switch checked: ${value}`, event); // eslint-disable-line
    }

    toggle() {
        this.state.disabled = !this.state.disabled
        this.setState(this.state)
      }
    

    onGetTemperatureClick(event) {
        console.log("Bearer ", this.idToken.jwtToken)
            return API.post("testApi", "/ryan").then((response) => {
                console.log(response)
                this.state.temperature = JSON.parse(response.body).temperature // updates Aqua Flag

                this.setState(this.state) // re-renders
            }).catch((error) => {
                console.log("test", error)
            })
        }

    onGetAquaFlagClick(event) {
        window.fetch("https://ef6c1se05k.execute-api.us-west-2.amazonaws.com/development/getAquaFlag/ryan", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }).then((response) => {
            return response.json() //unpacks into a readable json format
        }).then((response) => {
            console.log(response.aquaflag)
            this.state.aquaFlag = response.aquaFlag // updates Aqua Flag
            this.setState(this.state) // re-renders
        }).catch((error) => {console.log(error)})
    }
   
    onGetTakeupPumpClick(event) {
        /*We want a switch that  toggles on / off and also pulls info on last known state of the device*/

    }

    onGetFeedPumpClick(event) {
        /*We want a switch that  toggles on / off and also pulls info on last known state of the device*/
    }


    onGetAllFlagsClick(event) {
        window.fetch("https://ef6c1se05k.execute-api.us-west-2.amazonaws.com/development/getAllFlags/ryan", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }).then((response) => {
            return response.json() //unpacks into a readable json format
        }).then((response) => {
            console.log(response)
            this.state.aquaFlag = response.aquaFlag // updates aquaFlag
            this.state.feedFlag = response.feedFlag // updates aquaFlag
            this.state.takeupFlag = response.takeupFlag // updates aquaFlag
            this.state.overflowFlag = response.overflowFlag // updates aquaFlag
            this.setState(this.state) // re-renders
        }).catch((error) => {console.log(error)})
    }


    render() {
        return (
            <div>
                <div>
                    <h1>NTX Control Panel</h1>
                    <p> </p>
                    <h2>Water Exchange</h2>
                    <ul>
                        <li>Aquarium Status</li>
                        <ul>
                            <li>Temperature: <span className="temp">{this.state.temperature}</span></li>
                            <li>Aquarium H2O Level: <span className="aquaFlag">{this.state.aquaFlag}</span></li>
                            <li>Takeup Flag: <span className="takeupFlag">{this.state.takeupFlag}</span></li>
                        </ul>
                        <li>Water Exchange Status</li>
                        <ul>
                            <li>Water exchange scheduled for: <span className="wxtime" name="wxtime">12 AM</span></li>
                            <li>Feed pump: <span className="wxtime" name="feedpump">oflowflag</span></li>
                            <li>Takeup pump: <span className="wxtime" name="takeuppump">OFF</span></li>
                            <li>
                                {/* <table>
                                    <tr>
                                    <td>Feed level</td>
                                    <td>Takeup level</td>
                                    <td>Aquarium Error</td>
                                    </tr>
                                    <tr>
                                    <td><div className="feedflag" name="feedflag">0</div></td>
                                    <td><div className="takeupflag" name="takeupflag">0</div></td>
                                    <td><div className="oflowflag" name="oflowflag">0</div></td>
                                    </tr>
                                </table> */}
                            </li>
                        </ul>
                    </ul>
                    <button onClick={(event) => {this.onGetTemperatureClick(event)}}>get temperature {this.state.counter}</button>
                    <button onClick={(event) => {this.onGetAquaFlagClick(event)}}>get AquaFlag {this.state.counter}</button>
                    <button onClick={(event) => {this.onGetAllFlagsClick(event)}}>get All Flags {this.state.counter}</button>
                </div>   
                <div>
                    <ReactToggle
                        defaultChecked={false}
                        onChange={() => this.onChange()}
                        disabled={this.state.feedPump === true}
                        value="Feed Pump"
                    />
                </div>
                <div>
                    <RCSwitch
                        onChange={() => this.onChange()}
                        onClick={() => this.onChange()}
                        disabled={this.state.feedPump === true}
                        checkedChildren="I"
                        unCheckedChildren="O"
                    />
                
                    <div>
                        <button onClick={(event) => {this.toggle(event)}}>toggle disabled</button>
                    </div>
                </div>
            </div>
        )
    }
}


let AmplifyMainContent = withAuthenticator(Main)

ReactDOM.render(
    <AmplifyMainContent />,
    document.getElementById("mount")
)
