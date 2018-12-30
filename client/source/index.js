"use strict"

const React = require("react")
const ReactDOM = require("react-dom")
const MobxReact = require("mobx-react")

require("./index.less") 

@MobxReact.observer class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            rawr: 2
        }
        this.state.counter = 0
    }

    onClickHandler(event) {
        this.state.counter += 1
        this.setState(this.state)
        console.log(this.state.counter)

        window.fetch("https://ef6c1se05k.execute-api.us-west-2.amazonaws.com/development/testLambda/rawr", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }).catch((error) => {console.log(error)})
    }

    render() {
        return (
            <div>
                <button onClick={(event) => {this.onClickHandler(event)}}>click me {this.state.counter}</button>
            </div>
        )
    }
}



ReactDOM.render(
    <Main />,
    document.getElementById("mount")
)
