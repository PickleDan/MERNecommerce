import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./features/HomeScreen"
import ProductScreen from "./features/ProductScreen"
import CartScreen from "./features/CartScreen"
import LoginScreen from "./features/LoginScreen"
import RegisterScreen from "./features/RegisterScreen"
import ProfileScreen from "./features/ProfileScreen"
import ShippingScreen from "./features/ShippingScreen"

const App = () => {
  return (
    <Router>
      <Header />
      <main className={"py-3"}>
        <Container>
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
