import React from "react";
import { Table, Card, Input, Button } from "reactstrap";
import numeral from "numeral";

class MapSection extends React.Component {
  state = {
    radiantTeam: [],
    direTeam: [],

    whiteText: { color: "white" }
  };

  mapRadiantTeam(hero, index) {
    let atrSymbol = "";

    if (hero.primaryAttribute === 1) {
      atrSymbol =
        "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/thumb/7/7a/Strength_attribute_symbol.png/30px-Strength_attribute_symbol.png?version=6306b398d1e0dddfd5f3d1719c6e3c71";
    } else if (hero.primaryAttribute === 2) {
      atrSymbol =
        "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/thumb/2/2d/Agility_attribute_symbol.png/30px-Agility_attribute_symbol.png?version=2bb35660c66454fc3b024fdb19b9ee29";
    } else {
      atrSymbol =
        "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/thumb/5/56/Intelligence_attribute_symbol.png/30px-Intelligence_attribute_symbol.png?version=aea75b8d40acffb8f90549a9ff6cdecb";
    }
    return (
      <div className="row" style={{ marginTop: "5px" }}>
        <div className="col-3 float-left">
          <font color="white">{`${hero.heroName}`}</font>
        </div>
        <div className="col-2 float-right">
          <font color="white">{`${numeral(hero.heroWinRate).format(
            "0.00%"
          )}`}</font>
        </div>
        <div className="col-2 float-right">
          <img src={`${hero.heroImage}`} />
        </div>
        <div className="col-2 float-right">
          <img src={`${atrSymbol}`} height="30px" width="30px" />
        </div>
        <div className="col-3 float-left">
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
    let atrSymbol = "";

    if (hero.primaryAttribute === 1) {
      atrSymbol =
        "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/thumb/7/7a/Strength_attribute_symbol.png/30px-Strength_attribute_symbol.png?version=6306b398d1e0dddfd5f3d1719c6e3c71";
    } else if (hero.primaryAttribute === 2) {
      atrSymbol =
        "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/thumb/2/2d/Agility_attribute_symbol.png/30px-Agility_attribute_symbol.png?version=2bb35660c66454fc3b024fdb19b9ee29";
    } else {
      atrSymbol =
        "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/thumb/5/56/Intelligence_attribute_symbol.png/30px-Intelligence_attribute_symbol.png?version=aea75b8d40acffb8f90549a9ff6cdecb";
    }

    return (
      <div className="row" style={{ marginTop: "5px" }}>
        <div className="col-3 float-left">
          <font color="white">{`${hero.heroName}`}</font>
        </div>
        <div className="col-2 float-right">
          <font color="white">{`${numeral(hero.heroWinRate).format(
            "0.00%"
          )}`}</font>
        </div>
        <div className="col-2 float-right">
          <img src={`${hero.heroImage}`} />
        </div>
        <div className="col-2 float-right">
          <img src={`${atrSymbol}`} height="30px" width="30px" />
        </div>
        <div className="col-3 float-left">
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
                height="400m"
                width="400m"
              />
              {this.props.radiantTeam.map((hero, index) => {
                return (
                  <img
                    className="overlay"
                    style={{
                      marginLeft: `${-75 * (index + 1)}px`,
                      marginTop: "325px"
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
                      marginLeft: `${-75 * (index + 1)}px`,
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
