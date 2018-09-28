import React from "react";
import { mapTemplates } from "./HomePageFunctions";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GetAllHeroes,
  InsertMatchup,
  GetTemplates
} from "../Services/HeroService";
import { Helmet } from "react-helmet";
import {
  Table,
  Row,
  Col,
  Card,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import MapSection from "./MapSection";
import HomePageSweetAlerts from "./HomePageSweetAlerts";
import "./HomePage.css";

class Home extends React.Component {
  state = {
    matchups: [],

    strHeroes: [],
    agiHeroes: [],
    intHeroes: [],

    radiantTeam: [],
    radIcons: [],
    direTeam: [],
    direIcons: [],

    heroSelected: {},

    teamFullAlert: false,
    heroDraftedAlert: false,
    templateNameAlert: false,

    dropdownToggle: false,

    whiteText: { color: "white" }
  };

  componentDidMount() {
    let grabHeroes = GetAllHeroes();

    grabHeroes.then(response1 => {
      let tempStrArray = [];
      let tempAgiArray = [];
      let tempIntArray = [];

      let newResponse = response1.data.map(hero => ({
        ...hero,
        drafted: false
      }));

      for (let i = 0; i < newResponse.length; i++) {
        if (newResponse[i].primaryAttribute === 1) {
          tempStrArray.push(newResponse[i]);
        } else if (newResponse[i].primaryAttribute === 2) {
          tempAgiArray.push(newResponse[i]);
        } else if (newResponse[i].primaryAttribute === 3) {
          tempIntArray.push(newResponse[i]);
        }
      }

      let grabTemplates = GetTemplates();

      grabTemplates.then(response2 => {
        this.setState({
          matchups: response2.data,
          strHeroes: tempStrArray,
          agiHeroes: tempAgiArray,
          intHeroes: tempIntArray
        });
      });
    });
  }

  teamFullAlertOff = () => {
    this.setState({
      teamFullAlert: false
    });
  };

  heroDraftedAlertOff = () => {
    this.setState({
      heroDraftedAlert: false
    });
  };

  templateNameAlertOff = () => {
    this.setState({
      templateNameAlert: false
    });
  };

  handleHeroClicked = (hero, indexNum) => {
    let tempHeroObj = hero;
    tempHeroObj = { ...hero, arrayPosition: indexNum };
    this.setState({ heroSelected: tempHeroObj });
  };

  mapHeroes(hero, index) {
    if (hero.drafted) {
      return (
        <td>
          <img className="drafted" src={`${hero.heroImage}`} />
          <img
            className="draftedOverlay"
            src="https://blo.org/wp-content/uploads/2017/05/rtl-ttb-Slasha.png"
            height="45px"
            width="65px"
          />
        </td>
      );
    } else {
      return (
        <td>
          <a href="javascript:void(0)">
            <img
              className="hero"
              src={`${hero.heroImage}`}
              onClick={() => this.handleHeroClicked(hero, index)}
            />
          </a>
        </td>
      );
    }
  }

  addToRadiant = hero => {
    let tempRadiantArray = this.state.radiantTeam;
    let tempRadIconsArray = this.state.radIcons;

    if (hero.drafted) {
      this.setState({
        heroDraftedAlert: true
      });
    } else if (tempRadiantArray.length === 5) {
      this.setState({
        teamFullAlert: true
      });
    } else {
      hero.drafted = true;
      let tempHeroObj = { ...hero, position: 1 };
      tempHeroObj.isRadiant = true;
      if (hero.primaryAttribute === 1) {
        let tempStrArray = this.state.strHeroes;

        tempStrArray[hero.arrayPosition].drafted = true;
        tempRadiantArray.push(tempHeroObj);
        tempRadIconsArray.push(hero.heroMinimapIcon);

        this.setState({
          radiantTeam: tempRadiantArray,
          radIcons: tempRadIconsArray,
          strHeroes: tempStrArray,
          heroSelected: hero
        });
      } else if (hero.primaryAttribute === 2) {
        let tempAgiArray = this.state.agiHeroes;

        tempAgiArray[hero.arrayPosition].drafted = true;
        tempRadiantArray.push(tempHeroObj);
        tempRadIconsArray.push(hero.heroMinimapIcon);

        this.setState({
          radiantTeam: tempRadiantArray,
          radIcons: tempRadIconsArray,
          agiHeroes: tempAgiArray,
          heroSelected: hero
        });
      } else if (hero.primaryAttribute === 3) {
        let tempIntArray = this.state.intHeroes;

        tempIntArray[hero.arrayPosition].drafted = true;
        tempRadiantArray.push(tempHeroObj);
        tempRadIconsArray.push(hero.heroMinimapIcon);

        this.setState({
          radiantTeam: tempRadiantArray,
          radIcons: tempRadIconsArray,
          intHeroes: tempIntArray,
          heroSelected: hero
        });
      }
    }
  };

  addToDire = hero => {
    let tempDireArray = this.state.direTeam;
    let tempDireIconsArray = this.state.direIcons;

    if (hero.drafted) {
      this.setState({
        heroDraftedAlert: true
      });
    } else if (tempDireArray.length === 5) {
      this.setState({
        teamFullAlert: true
      });
    } else {
      hero.drafted = true;
      let tempHeroObj = { ...hero, position: 1 };
      tempHeroObj.isRadiant = false;
      if (hero.primaryAttribute === 1) {
        let tempStrArray = this.state.strHeroes;

        tempStrArray[hero.arrayPosition].drafted = true;
        tempDireArray.push(tempHeroObj);
        tempDireIconsArray.push(hero.heroMinimapIcon);

        this.setState({
          direTeam: tempDireArray,
          direIcons: tempDireIconsArray,
          strHeroes: tempStrArray,
          heroSelected: hero
        });
      } else if (hero.primaryAttribute === 2) {
        let tempAgiArray = this.state.agiHeroes;

        tempAgiArray[hero.arrayPosition].drafted = true;
        tempDireArray.push(tempHeroObj);
        tempDireIconsArray.push(hero.heroMinimapIcon);

        this.setState({
          direTeam: tempDireArray,
          direIcons: tempDireIconsArray,
          agiHeroes: tempAgiArray,
          heroSelected: hero
        });
      } else if (hero.primaryAttribute === 3) {
        let tempIntArray = this.state.intHeroes;

        tempIntArray[hero.arrayPosition].drafted = true;
        tempDireArray.push(tempHeroObj);
        tempDireIconsArray.push(hero.heroMinimapIcon);

        this.setState({
          direTeam: tempDireArray,
          direIcons: tempDireIconsArray,
          intHeroes: tempIntArray,
          heroSelected: hero
        });
      }
    }
  };

  changeHeroPosition = (value, index, isRadiant) => {
    if (isRadiant) {
      let tempRadiantArray = this.state.radiantTeam;
      tempRadiantArray[index].position = value;

      this.setState({
        radiantTeam: tempRadiantArray
      });
    } else {
      let tempDireArray = this.state.direTeam;
      tempDireArray[index].position = value;

      this.setState({
        direTeam: tempDireArray
      });
    }
  };

  submitMatchup = (radiantTeam, direTeam, templateName) => {
    let matchupObj = { radiantTeam, direTeam, templateName };

    let insteringMatchup = InsertMatchup(matchupObj);

    insteringMatchup.then(
      this.setState({
        templateNameAlert: false
      })
    );
  };

  render() {
    const { whiteText } = this.state;
    return (
      <div>
        <Helmet>
          <style>{"body { background-color: #222; }"}</style>
        </Helmet>
        <h1 style={whiteText} className="title text-center">
          Here is the home page my guy!
        </h1>
        <Row style={{ marginLeft: 0, marginRight: 0 }}>
          <Col>
            <div className="row justify-content-center">
              <h1 className="strength">Strength</h1>
            </div>
            <Card body className="boxShadowStr">
              <Table name="strengthHeroes" borderless>
                <tbody>
                  <div className="row">
                    {this.state.strHeroes.map((hero, index) =>
                      this.mapHeroes(hero, index)
                    )}
                  </div>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col>
            <div className="row justify-content-center">
              <h1 className="agility">Agility</h1>
            </div>
            <Card body className="boxShadowAgi">
              <Table name="agilityHeroes" borderless>
                <tbody>
                  <div className="row">
                    {this.state.agiHeroes.map((hero, index) =>
                      this.mapHeroes(hero, index)
                    )}
                  </div>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col>
            <div className="row justify-content-center">
              <h1 className="intelligence">Intelligence</h1>
            </div>
            <Card body className="boxShadowInt">
              <Table name="intellectHeroes" borderless>
                <tbody>
                  <div className="row">
                    {this.state.intHeroes.map((hero, index) =>
                      this.mapHeroes(hero, index)
                    )}
                  </div>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <div
          className="row justify-content-center"
          style={{ marginLeft: 0, marginRight: 0, marginTop: "20px" }}
        >
          <img
            src={`${
              this.state.heroSelected.heroName === undefined
                ? "https://i.imgur.com/69t4o4W.jpg"
                : this.state.heroSelected.heroSelectedImage
            }`}
            width="235"
            height="272"
          />
          <img
            className="overlay"
            src={`http://cdn.dota2.com/apps/dota2/images/heropedia/heroprimaryportrait_overlay.png`}
            width="243"
            height="278"
          />
        </div>
        <div
          className="row justify-content-center"
          style={{ marginLeft: 0, marginRight: 0 }}
        >
          <h1 style={whiteText} className="title text-center">
            {`${
              this.state.heroSelected.heroName === undefined
                ? "No Hero Chosen"
                : this.state.heroSelected.heroName
            }`}
          </h1>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginLeft: 0, marginRight: 0 }}
        >
          <div>
            <Button
              style={{
                width: "175px",
                backgroundColor: "white",
                color: "black"
              }}
              onClick={() => this.addToRadiant(this.state.heroSelected)}
            >
              {`<-- Draft To Radiant`}
            </Button>
            {` `}
            <Button
              style={{
                width: "175px",
                backgroundColor: "darkorange",
                color: "white"
              }}
              onClick={() => this.addToDire(this.state.heroSelected)}
            >
              {`Draft To Dire -->`}
            </Button>
          </div>
        </div>
        <MapSection
          radiantTeam={this.state.radiantTeam}
          direTeam={this.state.direTeam}
          changeHeroPosition={(value, index, isRadiant) =>
            this.changeHeroPosition(value, index, isRadiant)
          }
        />
        <div
          className="row justify-content-center"
          style={{ marginLeft: 0, marginRight: 0, marginTop: "10px" }}
        >
          <div>
            <Button
              color="success"
              onClick={() => this.setState({ templateNameAlert: true })}
              style={{
                width: "175px"
              }}
            >
              Save Matchup
            </Button>
            {` `}
            <ButtonDropdown
              direction="up"
              isOpen={this.state.dropdownToggle}
              toggle={() =>
                this.setState({ dropdownToggle: !this.state.dropdownToggle })
              }
            >
              <DropdownToggle
                caret
                color="info"
                style={{
                  width: "175px"
                }}
              >
                {" "}
                Choose Matchup
              </DropdownToggle>
              <DropdownMenu>
                {this.state.matchups.map(match => mapTemplates(match))}
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginLeft: 0, marginRight: 0, marginTop: "10px" }}
        >
          <div>
            <Button
              outline
              disabled
              color="success"
              //onClick={() => this.setState({ templateNameAlert: true })}
              style={{
                width: "175px"
              }}
            >
              Update Matchup
            </Button>
            {` `}
            <Button
              outline
              disabled
              color="danger"
              //onClick={() => this.setState({ templateNameAlert: true })}
              style={{
                width: "175px"
              }}
            >
              Delete Matchup
            </Button>
          </div>
        </div>
        <HomePageSweetAlerts
          templateNameAlert={this.state.templateNameAlert}
          templateNameAlertOff={() => this.templateNameAlertOff()}
          teamFullAlert={this.state.teamFullAlert}
          teamFullAlertOff={() => this.teamFullAlertOff()}
          heroDraftedAlert={this.state.heroDraftedAlert}
          heroDraftedAlertOff={() => this.heroDraftedAlertOff()}
          submitMatchup={templateName =>
            this.submitMatchup(
              this.state.radiantTeam,
              this.state.direTeam,
              templateName
            )
          }
        />
      </div>
    );
  }
}

export default Home;
