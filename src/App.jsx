import React from 'react';
import ReactDOM from 'react-dom';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';


export class App extends React.Component {
    constructor(props) {
        super(props);
        const defaultUserName = 'defaultUserName';
        this.state = { userName: defaultUserName, editingUserName: defaultUserName };

        this.setUsernameState = this.setUsernameState.bind(this);
        this.updateEditingName = this.updateEditingName.bind(this);
    }

    setUsernameState(newName) {
        this.setState({ userName: this.state.editingUserName });
    }

    updateEditingName(editingName) {
        this.setState({ editingUserName: editingName });
    }

    render() {
        return (
            <div>
                <HelloComponent userName={this.state.userName} />
                <NameEditComponent editingUserName={this.state.editingUserName}
                    onEditingNameUpdated={this.updateEditingName}
                    onNameUpdateRequest={this.setUsernameState} />
            </div>
        );
    }
}

