import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GetAllHeroes,
  InsertMatchup,
  GetTemplates,
  DeleteMatchup,
  UpdateMatchup
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
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import MapSection from "./MapSection";
import HomePageSweetAlerts from "./HomePageSweetAlerts";
import "./HomePage.css";
import { addingToRadiant, addingToDire, setMatchup } from "./HomePageFunctions";

class Home extends React.Component {
  state = {
    matchups: [],
    matchupIdSelected: 0,
    matchupName: "",
    matchupSelected: false,

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
    matchupDeletedAlert: false,

    dropdownToggle: false,

    whiteText: { color: "white" }
  };

  componentDidMount() {
    let grabHeroes = GetAllHeroes();

    grabHeroes.then(response1 => {
      console.log(response1);
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

  matchupDeletedAlertOff = () => {
    this.setState({
      matchupDeletedAlert: false
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

  mapTemplates(match) {
    return (
      <DropdownItem
        value={match.templateId}
        onClick={event =>
          this.getMatchup(event.target.value, match.templateName)
        }
      >
        {match.templateName}
      </DropdownItem>
    );
  }

  deleteMatchup = matchId => {
    DeleteMatchup(matchId);
    this.setState({
      matchupDeletedAlert: true
    });
  };

  updateMatchup = () => {
    let updatedMatchupObj = {
      TemplateId: this.state.matchupIdSelected,
      TemplateName: this.state.matchupName,
      RadiantInfo: this.state.radiantTeam,
      DireInfo: this.state.direTeam
    };
    UpdateMatchup(updatedMatchupObj);
  };

  getMatchup = (matchId, matchupName) => {
    //Function from File (Made into a custom Promise function)
    setMatchup(
      this.state.strHeroes,
      this.state.agiHeroes,
      this.state.intHeroes,
      matchId
    ).then(matchInfo => {
      if (matchInfo !== undefined) {
        this.setState({
          matchupName: matchupName,
          matchupSelected: true,
          matchupIdSelected: matchId,
          radiantTeam: matchInfo.radiantTeam,
          direTeam: matchInfo.direTeam,
          radIcons: matchInfo.radIcons,
          direIcons: matchInfo.direIcons,
          strHeroes: matchInfo.strHeroes,
          agiHeroes: matchInfo.agiHeroes,
          intHeroes: matchInfo.intHeroes
        });
      }
    });
  };

  addToRadiant = hero => {
    if (hero.drafted) {
      this.setState({
        heroDraftedAlert: true
      });
    } else if (this.state.radiantTeam.length === 5) {
      this.setState({
        teamFullAlert: true
      });
    } else {
      //Function from file
      let draftedState = addingToRadiant(
        this.state.radiantTeam,
        this.state.radIcons,
        hero,
        this.state.strHeroes,
        this.state.agiHeroes,
        this.state.intHeroes
      );

      this.setState({
        radiantTeam: draftedState.radiantHeroesArray,
        radIcons: draftedState.radiantIconsArray,
        strHeroes: draftedState.strHeroes,
        agiHeroes: draftedState.agiHeroes,
        intHeroes: draftedState.intHeroes,
        heroSelected: draftedState.heroObj
      });
    }
  };

  addToDire = hero => {
    if (hero.drafted) {
      this.setState({
        heroDraftedAlert: true
      });
    } else if (this.state.direTeam.length === 5) {
      this.setState({
        teamFullAlert: true
      });
    } else {
      //Function from file
      let draftedState = addingToDire(
        this.state.direTeam,
        this.state.direIcons,
        hero,
        this.state.strHeroes,
        this.state.agiHeroes,
        this.state.intHeroes
      );

      this.setState({
        direTeam: draftedState.direHeroesArray,
        direIcons: draftedState.direIconsArray,
        strHeroes: draftedState.strHeroes,
        agiHeroes: draftedState.agiHeroes,
        intHeroes: draftedState.intHeroes,
        heroSelected: draftedState.heroObj
      });
    }
  };

  changeHeroPosition = (value, index, isRadiant) => {
    if (isRadiant) {
      let tempRadiantArray = this.state.radiantTeam;
      tempRadiantArray[index].position = Number(value);

      this.setState({
        radiantTeam: tempRadiantArray
      });
    } else {
      let tempDireArray = this.state.direTeam;
      tempDireArray[index].position = Number(value);

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
          Draft Your Teams My Guy!
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
          style={{ marginLeft: 0, marginRight: 0, marginTop: 20 }}
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
          style={{ marginLeft: 0, marginRight: 0, marginTop: 10 }}
        >
          <video
            className="heroPortrait"
            poster="https://i.imgur.com/69t4o4W.jpg"
            src={this.state.heroSelected.heroSelectedImage}
            width="235"
            height="272"
            autoPlay
            loop
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
          style={{
            marginLeft: 0,
            marginRight: 0,
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <img
            src={`https://i.imgur.com/69t4o4W.jpg`}
            width="90"
            height="90"
            style={{ padding: 5 }}
          />
          <img
            src={`https://i.imgur.com/69t4o4W.jpg`}
            width="90"
            height="90"
            style={{ padding: 5 }}
          />
          <img
            src={`https://i.imgur.com/69t4o4W.jpg`}
            width="90"
            height="90"
            style={{ padding: 5 }}
          />
          <img
            src={`https://i.imgur.com/69t4o4W.jpg`}
            width="90"
            height="90"
            style={{ padding: 5 }}
          />
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
                color="primary"
                style={{
                  width: "175px"
                }}
              >
                {" "}
                Choose Matchup
              </DropdownToggle>
              <DropdownMenu>
                {this.state.matchups.map(match => this.mapTemplates(match))}
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
              outline={!this.state.matchupSelected}
              disabled={!this.state.matchupSelected}
              color="warning"
              onClick={() => this.updateMatchup()}
              style={{
                width: "175px"
              }}
            >
              Update Matchup
            </Button>
            {` `}
            <Button
              outline={!this.state.matchupSelected}
              disabled={!this.state.matchupSelected}
              color="danger"
              onClick={() => this.deleteMatchup(this.state.matchupIdSelected)}
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
          matchupDeletedAlert={this.state.matchupDeletedAlert}
          matchupDeletedAlertOff={() => this.matchupDeletedAlertOff()}
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
