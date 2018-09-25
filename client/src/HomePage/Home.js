import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetAllHeroes } from "../Services/HeroService";
import { Table, Row, Col, Card } from "reactstrap";

class Home extends React.Component {
  state = {
    strHeroes: [],
    agiHeroes: [],
    intHeroes: []
  };

  componentDidMount() {
    let grabHeroes = GetAllHeroes();

    grabHeroes.then(response => {
      let tempStrArray = [];
      let tempAgiArray = [];
      let tempIntArray = [];

      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].primaryAttribute === 1) {
          tempStrArray.push(response.data[i]);
        } else if (response.data[i].primaryAttribute === 2) {
          tempAgiArray.push(response.data[i]);
        } else if (response.data[i].primaryAttribute === 3) {
          tempIntArray.push(response.data[i]);
        }
      }
      this.setState({
        strHeroes: tempStrArray,
        agiHeroes: tempAgiArray,
        intHeroes: tempIntArray
      });
    });
  }

  mapHeroes(hero, index) {
    return (
      <td>
        <img
          src={`https://steamcdn-a.akamaihd.net/apps/dota2/images/heroes/${hero.heroName.toLowerCase()}_sb.png?v=4725322`}
        />
      </td>
    );
  }

  render() {
    return (
      <div>
        <h1 className="title text-center">Here is the home page my guy!</h1>
        <Card body style={{ backgroundColor: "#333", borderColor: "#333" }}>
          <Row>
            <Col xs="6" sm="4">
              <h1 style={{ color: "white" }} className="title text-Center">
                Strength
              </h1>
              <Card body>
                <Table name="strengthHeroes">
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
            <Col xs="6" sm="4">
              <h1 style={{ color: "white" }} className="title text-Center">
                Agility
              </h1>
              <Card body>
                <Table name="agilityHeroes">
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
            <Col xs="6" sm="4">
              <h1 style={{ color: "white" }} className="title text-Center">
                Intelligence
              </h1>
              <Card body>
                <Table name="intellectHeroes">
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
        </Card>
      </div>
    );
  }
}

export default Home;
