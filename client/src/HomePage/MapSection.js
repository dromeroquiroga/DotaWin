import React from "react";
import { Table, Card, Input, Button } from "reactstrap";

class MapSection extends React.Component {
  state = {
    radiantTeam: [],
    direTeam: [],

    whiteText: { color: "white" }
  };

  mapRadiantTeam(hero, index) {
    return (
      <div className="row" style={{ marginTop: "5px" }}>
        <div className="col-4 float-left">
          <font color="white">{hero.heroName}</font>
        </div>
        <div className="col-4 float-left">
          <img src={`${hero.heroImage}`} />
        </div>
        <div className="col-4 float-left">
          <Input
            type="select"
            value={hero.position}
            onChange={event =>
              this.props.changeHeroPosition(event.target.value, index, true)
            }
          >
            <option value={1}>Off Lane</option>
            <option value={2}>Mid Lane</option>
            <option value={3}>Safe Lane</option>
            <option value={4}>Jungle</option>
            <option value={5}>Roaming</option>
          </Input>
        </div>
      </div>
    );
  }

  mapDireTeam(hero, index) {
    return (
      <div className="row" style={{ marginTop: "5px" }}>
        <div className="col-4 float-left">
          <font color="white">{hero.heroName}</font>
        </div>
        <div className="col-4 float-left">
          <img src={`${hero.heroImage}`} />
        </div>
        <div className="col-4 float-left">
          <Input
            type="select"
            value={hero.position}
            onChange={event =>
              this.props.changeHeroPosition(event.target.value, index, false)
            }
          >
            <option value={1}>Off Lane</option>
            <option value={2}>Mid Lane</option>
            <option value={3}>Safe Lane</option>
            <option value={4}>Jungle</option>
            <option value={5}>Roaming</option>
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
                {this.props.radiantTeam.map((hero, index) =>
                  this.mapRadiantTeam(hero, index)
                )}
              </Card>
            </td>
            <td className="text-center" width="20%">
              <img
                src="https://i.imgur.com/90XfxsX.jpg"
                height="500m"
                width="500m"
              />
              {this.props.radiantTeam.map((hero, index) => {
                return (
                  <img
                    className="overlay"
                    style={{
                      marginLeft: `${-90 * (index + 1)}px`,
                      marginTop: "425px"
                    }}
                    src={`${hero.heroMinimapIcon}`}
                  />
                );
              })}
              {this.props.direTeam.map((hero, index) => {
                return (
                  <img
                    className="overlay"
                    style={{
                      marginLeft: `${-90 * (index + 1)}px`,
                      marginTop: "25px"
                    }}
                    src={`${hero.heroMinimapIcon}`}
                  />
                );
              })}
            </td>
            <td width="40%">
              <Card body className="boxShadowDire">
                <h2 className="title text-center" style={whiteText}>
                  <u>Dire Team</u>
                </h2>
                {this.props.direTeam.map((hero, index) =>
                  this.mapDireTeam(hero, index)
                )}
              </Card>
            </td>
          </tr>
        </Table>
      </div>
    );
  }
}

export default MapSection;
