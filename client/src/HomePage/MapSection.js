import React from "react";
import { Table, Card, Input, Button } from "reactstrap";
import numeral from "numeral";
import { GetWinPercentages } from "../Services/HeroService";
import {
  MapRadiantMidLaneIcon,
  MapRadiantOffLaneIcon,
  MapRadiantSafeLaneIcon,
  MapRadiantJungleIcon,
  MapDireMidLaneIcon,
  MapDireOffLaneIcon,
  MapDireSafeLaneIcon,
  MapDireJungleIcon,
  SelectLaneWinRate
} from "./MapSectionFunctions";

class MapSection extends React.Component {
  state = {
    teamsLocked: false,
    radiantWinPerc: 0,
    direWinPerc: 0,
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
        <div className="col-3">
          <Button
            size="sm"
            style={{ marginRight: 5, backgroundColor: "#f00f12" }}
          >
            X
          </Button>
          <img src={`${hero.heroImage}`} />
        </div>
        <div className="col-3" style={{ textAlign: "center" }}>
          <font color="white">{`${hero.heroName}`}</font>
        </div>
        <div className="col-1" style={{ textAlign: "center" }}>
          <img src={`${atrSymbol}`} height="30px" width="30px" />
        </div>
        <div className="col-2 float-right">
          <font color="white">{`${SelectLaneWinRate(hero)}`}</font>
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
        <div className="col-3">
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
        <div className="col-2" style={{ textAlign: "right" }}>
          <font color="white">{`${SelectLaneWinRate(hero)}`}</font>
        </div>
        <div className="col-1" style={{ textAlign: "center" }}>
          <img src={`${atrSymbol}`} height="30px" width="30px" />
        </div>
        <div className="col-3" style={{ textAlign: "center" }}>
          <font color="white">{`${hero.heroName}`}</font>
        </div>
        <div className="col-3" style={{ textAlign: "right" }}>
          <img src={`${hero.heroImage}`} />
          <Button
            size="sm"
            style={{ marginLeft: 5, backgroundColor: "#f00f12" }}
          >
            X
          </Button>
        </div>
      </div>
    );
  }

  buttonToRender() {
    if (this.state.teamsLocked) {
      return (
        <Button
          style={{
            backgroundColor: "black",
            width: "200px"
          }}
          onClick={() =>
            this.setState({
              teamsLocked: false,
              radiantWinPerc: 0,
              direWinPerc: 0
            })
          }
        >
          <img
            className="lock"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/lock-icon-614x460.png"
            height="25px"
            width="35px"
          />
          Teams Locked!
        </Button>
      );
    } else {
      return (
        <Button
          style={{ backgroundColor: "black", width: "200px" }}
          onClick={() =>
            this.getWinRates(this.props.radiantTeam, this.props.direTeam)
          }
        >
          <img
            className="lock"
            src="https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/lock-open-key-512.png"
            height="25px"
            width="25px"
          />
          Lock Teams
        </Button>
      );
    }
  }

  mapWinRates() {
    if (this.state.teamsLocked) {
      return (
        <div>
          <p
            className="radiantOverlay"
            style={{ marginTop: "-150px", marginLeft: "80px" }}
          >
            {numeral(this.state.radiantWinPerc / 100).format("0.00%")}
          </p>
          <p
            className="radiantOverlay"
            style={{ marginTop: "-300px", marginLeft: "195px" }}
          >
            {numeral(this.state.direWinPerc / 100).format("0.00%")}
          </p>
        </div>
      );
    }
  }

  getWinRates(radiantTeam, direTeam) {
    let bothTeams = {
      radiantHero1: radiantTeam[0] ? radiantTeam[0].heroId : 0,
      radiantHero1Position: radiantTeam[0] ? radiantTeam[0].position : 0,
      radiantHero2: radiantTeam[1] ? radiantTeam[1].heroId : 0,
      radiantHero2Position: radiantTeam[1] ? radiantTeam[1].position : 0,
      radiantHero3: radiantTeam[2] ? radiantTeam[2].heroId : 0,
      radiantHero3Position: radiantTeam[2] ? radiantTeam[2].position : 0,
      radiantHero4: radiantTeam[3] ? radiantTeam[3].heroId : 0,
      radiantHero4Position: radiantTeam[3] ? radiantTeam[3].position : 0,
      radiantHero5: radiantTeam[4] ? radiantTeam[4].heroId : 0,
      radiantHero5Position: radiantTeam[4] ? radiantTeam[4].position : 0,
      direHero1: direTeam[0] ? direTeam[0].heroId : 0,
      direHero1Position: direTeam[0] ? direTeam[0].position : 0,
      direHero2: direTeam[1] ? direTeam[1].heroId : 0,
      direHero2Position: direTeam[1] ? direTeam[1].position : 0,
      direHero3: direTeam[2] ? direTeam[2].heroId : 0,
      direHero3Position: direTeam[2] ? direTeam[2].position : 0,
      direHero4: direTeam[3] ? direTeam[3].heroId : 0,
      direHero4Position: direTeam[3] ? direTeam[3].position : 0,
      direHero5: direTeam[4] ? direTeam[4].heroId : 0,
      direHero5Position: direTeam[4] ? direTeam[4].position : 0
    };

    let grabWinPercentages = GetWinPercentages(bothTeams);

    grabWinPercentages.then(response => {
      this.setState({
        teamsLocked: true,
        radiantWinPerc: response.data.radiantWinRate,
        direWinPerc: response.data.direWinRate
      });
    });
  }

  render() {
    let radiantLanes = {
      radiantOfflaners: [],
      radiantSafelaners: [],
      radiantMidlaners: [],
      radiantJunglers: []
    };
    let direLanes = {
      direOfflaners: [],
      direSafelaners: [],
      direMidlaners: [],
      direJunglers: []
    };

    if (!this.state.teamsLocked) {
      this.props.radiantTeam.forEach(hero => {
        switch (hero.position) {
          case 1:
            radiantLanes.radiantOfflaners.push(hero);
            break;
          case 2:
            radiantLanes.radiantMidlaners.push(hero);
            break;
          case 3:
            radiantLanes.radiantSafelaners.push(hero);
            break;
          case 4:
            radiantLanes.radiantJunglers.push(hero);
            break;
          case 5:
            break;
        }
      });
      this.props.direTeam.forEach(hero => {
        switch (hero.position) {
          case 1:
            direLanes.direOfflaners.push(hero);
            break;
          case 2:
            direLanes.direMidlaners.push(hero);
            break;
          case 3:
            direLanes.direSafelaners.push(hero);
            break;
          case 4:
            direLanes.direJunglers.push(hero);
            break;
          case 5:
            break;
        }
      });
    }
    const { whiteText } = this.state;
    return (
      <div style={{ marginTop: "20px" }}>
        <div
          className="row justify-content-center"
          style={{ marginLeft: 0, marginRight: 0 }}
        >
          {this.buttonToRender()}
        </div>
        <Table borderless>
          <tr>
            <td width="40%">
              <Card body className="boxShadowRad">
                <h2 className="title text-center" style={whiteText}>
                  <u>Radiant Team Win Rates</u>
                </h2>
                {this.props.radiantTeam.map((hero, index) =>
                  this.mapRadiantTeam(hero, index)
                )}
              </Card>
            </td>
            <td className="text-center" width="20%">
              <img
                className="dotamap"
                src="https://i.imgur.com/90XfxsX.jpg"
                height="400m"
                width="400m"
              />
              {radiantLanes.radiantOfflaners.map((hero, index) =>
                MapRadiantOffLaneIcon(hero, index)
              )}
              {radiantLanes.radiantSafelaners.map((hero, index) =>
                MapRadiantSafeLaneIcon(hero, index)
              )}
              {radiantLanes.radiantMidlaners.map((hero, index) =>
                MapRadiantMidLaneIcon(hero, index)
              )}
              {radiantLanes.radiantJunglers.map((hero, index) =>
                MapRadiantJungleIcon(hero, index)
              )}
              {direLanes.direOfflaners.map((hero, index) =>
                MapDireOffLaneIcon(hero, index)
              )}
              {direLanes.direSafelaners.map((hero, index) =>
                MapDireSafeLaneIcon(hero, index)
              )}
              {direLanes.direMidlaners.map((hero, index) =>
                MapDireMidLaneIcon(hero, index)
              )}
              {direLanes.direJunglers.map((hero, index) =>
                MapDireJungleIcon(hero, index)
              )}
              {this.mapWinRates()}
            </td>
            <td width="40%">
              <Card body className="boxShadowDire">
                <h2 className="title text-center" style={whiteText}>
                  <u>Dire Team Win Rates</u>
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
