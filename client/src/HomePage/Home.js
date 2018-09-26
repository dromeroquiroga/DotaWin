import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetAllHeroes } from "../Services/HeroService";
import { Helmet } from "react-helmet";
import { Table, Row, Col, Card, Button } from "reactstrap";
import MapSection from "./MapSection";
import HomePageSweetAlerts from "./HomePageSweetAlerts";
import "./HomePage.css";

class Home extends React.Component {
  state = {
    strHeroes: [],
    agiHeroes: [],
    intHeroes: [],

    radiantTeam: [],
    direTeam: [],

    heroSelected: {},

    teamFullAlert: false,
    heroDraftedAlert: false,

    whiteText: { color: "white" }
  };

  componentDidMount() {
    let grabHeroes = GetAllHeroes();

    grabHeroes.then(response => {
      let tempStrArray = [];
      let tempAgiArray = [];
      let tempIntArray = [];

      let newResponse = response.data.map(hero => ({
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

      this.setState({
        strHeroes: tempStrArray,
        agiHeroes: tempAgiArray,
        intHeroes: tempIntArray
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

  handleHeroClicked = (hero, indexNum) => {
    let tempHeroObj = hero;

    tempHeroObj = { ...hero, position: indexNum };

    this.setState({ heroSelected: tempHeroObj });
  };

  mapHeroes(hero, index) {
    if (hero.drafted) {
      return (
        <td>
          <a href="javascript:void(0)">
            <img className="drafted" src={`${hero.heroImage}`} />
          </a>
        </td>
      );
    } else {
      return (
        <td>
          <a href="javascript:void(0)">
            <img
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
      if (hero.primaryAttribute === 1) {
        let tempStrArray = this.state.strHeroes;

        tempStrArray[hero.position].drafted = true;
        tempRadiantArray.push(hero);

        this.setState({
          radiantTeam: tempRadiantArray,
          strHeroes: tempStrArray,
          heroSelected: hero
        });
      } else if (hero.primaryAttribute === 2) {
        let tempAgiArray = this.state.agiHeroes;

        tempAgiArray[hero.position].drafted = true;
        tempRadiantArray.push(hero);

        this.setState({
          radiantTeam: tempRadiantArray,
          agiHeroes: tempAgiArray,
          heroSelected: hero
        });
      } else if (hero.primaryAttribute === 3) {
        let tempIntArray = this.state.intHeroes;

        tempIntArray[hero.position].drafted = true;
        tempRadiantArray.push(hero);

        this.setState({
          radiantTeam: tempRadiantArray,
          intHeroes: tempIntArray,
          heroSelected: hero
        });
      }
    }
  };

  addToDire = hero => {
    let tempDireArray = this.state.direTeam;

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
      if (hero.primaryAttribute === 1) {
        let tempStrArray = this.state.strHeroes;

        tempStrArray[hero.position].drafted = true;
        tempDireArray.push(hero);

        this.setState({
          direTeam: tempDireArray,
          strHeroes: tempStrArray,
          heroSelected: hero
        });
      } else if (hero.primaryAttribute === 2) {
        let tempAgiArray = this.state.agiHeroes;

        tempAgiArray[hero.position].drafted = true;
        tempDireArray.push(hero);

        this.setState({
          direTeam: tempDireArray,
          agiHeroes: tempAgiArray,
          heroSelected: hero
        });
      } else if (hero.primaryAttribute === 3) {
        let tempIntArray = this.state.intHeroes;

        tempIntArray[hero.position].drafted = true;
        tempDireArray.push(hero);

        this.setState({
          direTeam: tempDireArray,
          intHeroes: tempIntArray,
          heroSelected: hero
        });
      }
    }
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
            src={`http://cdn.dota2.com/apps/dota2/images/heroes/${
              this.state.heroSelected.heroName === undefined
                ? ""
                : this.state.heroSelected.heroName.toLowerCase()
            }_vert.jpg?v=4728473`}
            width="235"
            height="272"
          />
        </div>
        <div className="row justify-content-center">
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
              color="primary"
              onClick={() => this.addToRadiant(this.state.heroSelected)}
            >
              Draft To Radiant
            </Button>
            {` `}
            <Button
              color="danger"
              onClick={() => this.addToDire(this.state.heroSelected)}
            >
              Draft To Dire
            </Button>
          </div>
        </div>
        <MapSection
          radiantTeam={this.state.radiantTeam}
          direTeam={this.state.direTeam}
        />
        <HomePageSweetAlerts
          teamFullAlert={this.state.teamFullAlert}
          teamFullAlertOff={() => this.teamFullAlertOff()}
          heroDraftedAlert={this.state.heroDraftedAlert}
          heroDraftedAlertOff={() => this.heroDraftedAlertOff()}
        />
      </div>
    );
  }
}

export default Home;
