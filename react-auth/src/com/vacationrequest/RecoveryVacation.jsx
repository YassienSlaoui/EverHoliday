import React, { Component } from 'react'
import HolidayService from '../../servicees/HolidayService'
import Calendar from '../calendor/calendar5'
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
class RecoveryVacation extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            balance: []
        }
        
        this.saverequestvacationpaid = this.saverequestvacationpaid.bind(this);
    }

    // step 3
    
    saverequestvacationpaid = (e) => {
        e.preventDefault();
        let holiday = {date_start: this.state.datestart, date_end: this.state.date, duration: this.state.duration};
        console.log('vacation => ' + JSON.stringify(RequestVacationPaid));
         BalanceService.createRequestVacationPaid(RequestVacationPaid).then(res =>{
        this.props.history.push('/admin/RequestVacation/History');});
    }
    

    cancel(){
        this.props.history.push('/admin/RequestVacation/History');
    }

    
    render() {
        return (
        <Container fluid>
            <Row>
              <Col md="5">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Unpaid vacation</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                             <select>
                                            <option defaultValue value="Fullday">Full-day</option>
                                            <option value="Halfday">Half-day</option>
                                            <option value="Hours">Hours</option>
                             </select>
                          </Form.Group>
                        </Col>
                      
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                      </Row>
                      <Row>
                        <Col md="15">
                          <Form.Group>
                            <label>Description:</label>
                            <Form.Control cols="80" defaultValue="Description request" rows="4" as="textarea" ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Button className="btn-fill pull-right" type="submit" variant="info" > Save request</Button>
                      <Button className="btn btn-danger"  style={{marginLeft: "10px"}}> Cancel</Button>
                      {/*<div className="clearfix"></div>*/}
                    </Form>
                  </Card.Body>
                </Card>
              </Col>


              <Col md="7">
                <Card className="card-user">
                <div className = "form-group">
                                        <Calendar/>
                                        </div>
                
                </Card>
              </Col>
            </Row>
          </Container>
        );
    }
}

export default RecoveryVacation