import React from 'react';

export class NameEditComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.onEditingNameUpdated(event.target.value);
    }

    render() {
        return (
            <div>
                <label>Update name:</label>
                <input value={this.props.editingUserName} onChange={this.onChange} />
                <button className="btn btn-primary" onClick={this.props.onNameUpdateRequest}>Change</button>
            </div>
        );
    }
}