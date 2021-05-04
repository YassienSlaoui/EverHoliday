import React, { Component } from 'react'
import collaboratorService from '../servicees/CollaborateurServices';
import SupervisorService from '../servicees/supervisorServices'
import { I18nPropvider, LOCALES } from '../i18nProvider';
import translate from "../i18nProvider/translate"
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
  } from "react-bootstrap";

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: parseInt(sessionStorage.getItem('user')),
            cin:"",  
            firstname:"",
            lastname:"",
            team:"",
            age:"",
            adresse:"",
            username:"",
            country:"" 
            
        }
        this.changecinHandler = this.changecinHandler.bind(this);
        this.changefirstnameHandler =this.changefirstnameHandler.bind(this);
        this.changelastnameHandler =this.changelastnameHandler.bind(this);
        this.changeteamHandler =this.changeteamHandler.bind(this);
        this.changeageHandler =this.changeageHandler.bind(this);
        this.changeadresseHandler =this.changeadresseHandler.bind(this);
        
        this.changeusernameHandler = this.changeusernameHandler.bind(this);
        this.changecountry_workHandler=this.changecountry_workHandler.bind(this);
        this.UpdateUser = this.UpdateUser.bind(this);
    }

    componentDidMount(){
        console.log(this.state.id)
        collaboratorService.getUserById(this.state.id).then( (res) =>{
          let user = res.data;
          this.setState({
              id:user.id,
              cin:user.cin,  
              firstname:user.firstname,
              lastname:user.lastname,
              team:user.team,
              age:user.age,
              adresse:user.adresse,
              username:user.username,
              country:user.country
          });
        });
      
      }
      
    
    UpdateUser = (e) => {
      e.preventDefault();
      let user = {cin:this.state.cin,  
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        team:this.state.team,
        age:this.state.age,
        adresse:this.state.adresse,
        username:this.state.username,
        country:this.state.country};
      // step 5
      
      collaboratorService.updateUser(user, this.state.id).then( res => {
        this.props.history.push('/admin/Collaborator');
        });
      }
  
      changecinHandler= (event) => {
        this.setState({cin: event.target.value});
    }

    changeageHandler= (event) => {
        this.setState({age: event.target.value});
    }

    changeteamHandler= (event) => {
        this.setState({team: event.target.value});
    }
    changefirstnameHandler= (event) => {
        this.setState({firstname: event.target.value});
    }

    changelastnameHandler= (event) => {
        this.setState({lastname: event.target.value});
    }
    

    changeadresseHandler= (event) => {
        this.setState({adresse: event.target.value});
    }

    
    changeusernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changecountry_workHandler= (event) => {
        this.setState({country: event.target.value});
    }
    changeselectHandler= (event) => {
        this.setState({select: event.target.value});
    }

    render() {
        return (
          
            <Container fluid>
            <Row>
              <Col md="8">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">{translate('Edit Profile')}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                            <label>{translate('Company')} </label>
                            <Form.Control defaultValue="Everis" disabled placeholder="Company" type="text" ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="3">
                          <Form.Group>
                            <label>CIN</label>
                            <Form.Control defaultValue={this.state.cin} onChange={this.changecinHandler} placeholder="CIN" type="text" ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                            {translate('FirstName')}
                            </label>
                            <Form.Control defaultValue={this.state.firstname} onChange={this.changefirstnameHandler} type="text" ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>{translate('LastName')}</label>
                            <Form.Control defaultValue={this.state.lastname} onChange={this.changelastnameHandler}  placeholder="Last Name" type="text" ></Form.Control>
                          </Form.Group>
                        </Col>
                        
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>{translate('age')}</label>
                            <Form.Control defaultValue={this.state.age} onChange={this.changeageHandler} placeholder="Age" type="number" ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>{translate('address')}</label>
                            <Form.Control defaultValue={this.state.adresse} onChange={this.changeadresseHandler} placeholder="Adresse" type="text" ></Form.Control>
                          </Form.Group>
                        </Col>
                        
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label>{translate('username')}</label>
                            <Form.Control placeholder="Usrname" type="text" onChange={this.changeusernameHandler} defaultValue={this.state.username}></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label>{translate('country work')}</label>
                            <Form.Control placeholder="Country" type="text" onChange={this.changecountry_workHandler} defaultValue={this.state.country}></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Button className="btn-fill pull-right" type="submit" variant="info" onClick={this.UpdateUser} >
                      {translate('Update Profile')} 
                      </Button>
                      <div className="clearfix"></div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <div className="card-image">
                    <img alt="..." src={ require("assets/img/photo-1431578500526-4d9613015464.jpeg") .default } ></img>
                  </div>
                  <Card.Body>
                    <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img alt="..." className="avatar border-gray" src={require("assets/img/default-avatar.png").default} ></img>
                        <h5 className="title" >{this.state.firstname+" "+ this.state.lastname}</h5>
                      </a>
                      <p className="description" >{this.state.username}</p>
                    </div>
                  </Card.Body>
                  <hr></hr>
                 
                </Card>
              </Col>
            </Row>
          </Container>
        );}}

export default Profile;