import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

class HomePageSweetAlerts extends React.Component {
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
      </div>
    );
  }
}

export default HomePageSweetAlerts;
