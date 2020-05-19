import React, {ChangeEvent, Component} from 'react';

type PropsType = {
  status: string,
  updateStatus: (newStatus: string) => void
}

type stateType = {
  editMode: boolean,
  status: string
}

export default class ProfileStatus extends Component<PropsType, stateType> {

  state = {
    editMode: false,
    status: this.props.status
  };

  componentDidUpdate(prevProps: PropsType, prevState: stateType ) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status)
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.target.value
    })
  };

  render() {
    return(
      <div>
        {!this.state.editMode
          ? <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || "-------"}</span>
          </div>
          : <div>
            <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
          </div>
        }
      </div>
    )
  }
}