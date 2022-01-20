export default (props) => {
    return (<form onSubmit={props.submit}>
        <div className="border border-secondary rounded border-1 card">

            {/* Form header */}
            <div className="text-center card-header">
                <h2>{props.headerName}</h2>
            </div>

            {/* Form body */}
            <div className="p-3">

                {/* Loading gif && Alert box */}
                {props.alertBox}

                {/* Form inputs */}
                {props.inputs}

                {/* Submit button */}
                <div className='d-flex justify-content-center'>
                    <button className="btn btn-primary" type='submit'>
                        {props.buttonName}
                    </button>
                </div>

                {/* Form footer */}
                <div className='container pt-4'>
                    {props.footer}
                </div>

            </div>
        </div>
    </form>)
}

