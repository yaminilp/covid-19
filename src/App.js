import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from "react-bootstrap/CardColumns"
import Columns from "react-columns"
import Form from "react-bootstrap/Form"

import "bootstrap/dist/css/bootstrap.min.css"


import axios from "axios"


function App() {


  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState([]);


  useEffect(() => {
    axios.
    all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries")

    ]).then(responseArr => {
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
      console.log(responseArr[1].data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const filterCountries = results.filter(item =>
    {
      return searchCountries !== "" ? item.country.includes(searchCountries) : item;
    }
    );


  const countries = filterCountries.map((data, i) => {
    return (
      <Card key={i} bg="light" text="dark" className="text-center" style={{margin: "10px"}}>
      <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Recovered {data.recovered}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>

        </Card.Body>
      </Card>
    );
  });

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  return (
    <div>
    <CardDeck>
        <Card bg="secondary" text="white" className="text-center" style={{margin: "20px", font:"bold"}}>
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated} ago</small>
          </Card.Footer>
        </Card>
        <Card bg="primary"  text="white" className="text-center" style={{margin: "20px"}}>
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated} ago</small>
          </Card.Footer>
        </Card>
        <Card bg="success"  text="white" className="text-center" style={{margin: "20px"}}>
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
             {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated} ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>

      <Form>
        <Form.Group controlId="formCountries" style={{margin: "10px"}}>
          <Form.Control type="text" placeholder="Search for countries"  onChange = {e => setSearchCountries(e.target.value)}/>
        </Form.Group>
      </Form>

      <Columns>{countries}</Columns>
    </div>

  );
}

export default App;
