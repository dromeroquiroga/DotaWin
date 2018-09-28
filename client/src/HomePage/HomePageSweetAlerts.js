import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input } from "reactstrap";

class HomePageSweetAlerts extends React.Component {
  state = {
    templateName: ""
  };
  render() {
    return (
      <div>
        <SweetAlert
          danger
          show={this.props.teamFullAlert}
          title="You Have Already Drafted Five Heroes For This Team"
          onConfirm={() => this.props.teamFullAlertOff()}
        />
        <SweetAlert
          danger
          show={this.props.heroDraftedAlert}
          title="This Hero Has Already Been Drafted"
          onConfirm={() => this.props.heroDraftedAlertOff()}
        />
        <SweetAlert
          show={this.props.templateNameAlert}
          showCancel
          title="Please Enter A Name For This Matchup"
          onConfirm={() => this.props.submitMatchup(this.state.templateName)}
          onCancel={this.props.templateNameAlertOff}
        >
          <Input
            type="text"
            value={this.state.templateName}
            onChange={event =>
              this.setState({ templateName: event.target.value })
            }
          />
        </SweetAlert>
      </div>
    );
  }
}

export default HomePageSweetAlerts;
