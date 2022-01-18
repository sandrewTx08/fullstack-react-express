import { Component } from "react"


class Input extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (<div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">{this.props.icon}</span>
            <input
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
                type={this.props.type}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"></input>
        </div>)
    }
}

export default Input
