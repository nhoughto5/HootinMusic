import { Link } from "gatsby"
import React from "react"
import { Form, Nav, Navbar } from "react-bootstrap"

const CustomNavbar = ({ pageInfo }) => {
  console.log(pageInfo)
  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
        {/* <Container> */}
        <Link to="/" className="link-no-style navTitle">
          <Navbar.Brand as="span">Hootin Music</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={pageInfo && pageInfo.pageName}>
            <Link to="/music" className="link-no-style">
              <Nav.Link as="span" eventKey="music">
                Music
              </Nav.Link>
            </Link>

            <Link to="/videos" className="link-no-style">
              <Nav.Link as="span" eventKey="videos">
                Video
              </Nav.Link>
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <Form inline onSubmit={e => e.preventDefault()}>
              {/* <Form.Group>
                <FormControl
                  type="text"
                  placeholder="Fake Search"
                  className="mr-2"
                />
              </Form.Group>
              <Button>Fake Button</Button> */}
            </Form>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  )
}

export default CustomNavbar
