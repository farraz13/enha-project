import { Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus, NavComps } from "./Components/index";
import { Row } from "react-bootstrap";
import React, { Component } from "react";
import { API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryYangDipilih: "Makanan"
    };
  }

  componentDidMount() {
    axios
      .get(API_URL+"products?category.nama="+this.state.categoryYangDipilih)
      .then((res) => {
        console.log("Response: ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeCategory =(value)=>{
    this.setState({
      categoryYangDipilih: value,
      menus: []
    })

    axios
    .get(API_URL+"products?category.nama="+value)
    .then((res) => {
      console.log("Response: ", res);
      const menus = res.data;
      this.setState({ menus });
    })
    .catch((error) => {
      console.log(error);
    });

  }

  render() {
    const { menus,categoryYangDipilih } = this.state;
    return (
      <div className="App">
        <NavComps />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} categoryYangDipilih={categoryYangDipilih} />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <>
                        <Menus
                        key={menu.id}
                        menu={menu}
                        />
                        <br />
                      </>
                    ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
