import { Component } from "react"


class Form extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (<form onSubmit={this.props.submit}>
            <div className="border border-secondary rounded border-1 card">

                {/* Form header */}
                <div className="text-center card-header">
                    <h2>{this.props.headerName}</h2>
                </div>

                {/* Form body */}
                <div className="p-3">

                    {/* Loading gif && Alert box */}
                    {this.props.alertBox}

                    {/* Form inputs */}
                    {this.props.inputs}

                    {/* Submit button */}
                    <div className='d-flex justify-content-center'>
                        <button className="btn btn-primary" type='submit'>
                            {this.props.buttonName}
                        </button>
                    </div>

                    {/* Form footer */}
                    <div className='container pt-4'>
                        {this.props.footer}
                    </div>

                </div>
            </div>
        </form>)
    }
}

export default Form

