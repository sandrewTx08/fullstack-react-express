export default (props) => {
    return (<div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">{props.icon}</span>
        <input
            onChange={props.onChange}
            placeholder={props.placeholder}
            type={props.type}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"></input>
    </div>)
}

