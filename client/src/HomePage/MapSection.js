import React from "react";
import { Table, Card, Input } from "reactstrap";

class MapSection extends React.Component {
  state = {
    radiantTeam: [],
    direTeam: [],

    whiteText: { color: "white" }
  };

  mapRadiantTeam(hero) {
    return (
      <div className="row" style={{ marginTop: "5px" }}>
        <div className="col-4 float-left">
          <font color="white">{hero.heroName}</font>
        </div>
        <div className="col-4 float-left">
          <img src={`${hero.heroImage}`} />
        </div>
        <div className="col-4 float-left">
          <Input type="select">
            <option>Top Lane</option>
            <option>Mid Lane</option>
            <option>Bot Lane</option>
            <option>Jungle</option>
            <option>Roaming</option>
          </Input>
        </div>
      </div>
    );
  }

  mapDireTeam(hero) {
    return (
      <div className="row" style={{ marginTop: "5px" }}>
        <div className="col-4 float-left">
          <font color="white">{hero.heroName}</font>
        </div>
        <div className="col-4 float-left">
          <img src={`${hero.heroImage}`} />
        </div>
        <div className="col-4 float-left">
          <Input type="select">
            <option>Top Lane</option>
            <option>Mid Lane</option>
            <option>Bot Lane</option>
            <option>Jungle</option>
            <option>Roaming</option>
          </Input>
        </div>
      </div>
    );
  }

  render() {
    const { whiteText } = this.state;
    return (
      <div style={{ marginTop: "20px" }}>
        <Table borderless>
          <tr>
            <td width="40%">
              <Card body className="boxShadowRad">
                <h2 className="title text-center" style={whiteText}>
                  <u>Radiant Team</u>
                </h2>
                {this.props.radiantTeam.map(hero => this.mapRadiantTeam(hero))}
              </Card>
            </td>
            <td className="text-center" width="20%">
              <img
                src="https://i.imgur.com/90XfxsX.jpg"
                height="500m"
                width="500m"
              />
            </td>
            <td width="40%">
              <Card body className="boxShadowDire">
                <h2 className="title text-center" style={whiteText}>
                  <u>Dire Team</u>
                </h2>
                {this.props.direTeam.map(hero => this.mapDireTeam(hero))}
              </Card>
            </td>
          </tr>
        </Table>
      </div>
    );
  }
}

export default MapSection;
