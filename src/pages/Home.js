import { Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../Components/index";
import { Row } from "react-bootstrap";
import React, { Component } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";
import "../index.css";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then((res) => {
        // console.log("Response: ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });


      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        // console.log("Response: ", res);
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState){
    if(this.state.keranjangs !== prevState.keranjangs){
      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        // console.log("Response: ", res);
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        // console.log("Response: ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id="+value.id)
      .then((res) => {
        // console.log("Response: ", res);
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }
          
              axios
              .post(API_URL+"keranjangs",keranjang)
              .then((res) => {
                swal({
                  title: "Success",
                  text: "Sukses masuk keranjang "+keranjang.product.nama,
                  icon: "success",
                  button: false,
                  timer: 1500
                });
              })
              .catch((error) => {
                console.log(error);
              });
        }

        else{
          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value
          };

          axios
          .put(API_URL+"keranjangs/"+res.data[0].id,keranjang)
          .then((res) => {
            swal({
              title: "Success",
              text: "Sukses masuk keranjang "+keranjang.product.nama,
              icon: "success",
              button: false,
              timer: 1500
            });
          })
          .catch((error) => {
            console.log(error);
          });

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categoryYangDipilih, keranjangs } = this.state;
    return (
     
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoryYangDipilih={categoryYangDipilih}
              />
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
                          masukKeranjang={this.masukKeranjang}
                        />
                        <br />
                      </>
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} />
            </Row>
          </Container>
        </div>

    );
  }
}
