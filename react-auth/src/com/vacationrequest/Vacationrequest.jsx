import React, { Component } from 'react'
import '../css/Request.css';
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import Calendar from '../calendor/calendar3'
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
class Vacationrequest extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            balance: []
        }
        
        this.saverequestvacationpaid = this.saverequestvacationpaid.bind(this);
        this.paid=this.paid.bind(this);
        this.unpaid=this.unpaid.bind(this)
        this.exception=this.exception.bind(this)
        this.recovery=this.recovery.bind(this)}

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
    paid(){
        this.props.history.push('/admin/vacationrequest/paid');
    }
    unpaid(){
        this.props.history.push('/admin/vacationrequest/unpaid');
    }
    exception(){
        this.props.history.push('/admin/vacationrequest/exceptional');
    }
    recovery(){
        this.props.history.push('/admin/vacationrequest/recovery');
    }
    render() {
        return (
          
        <Container fluid>
            <Row>
              <Col md="12">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">{translate('Vacation request')}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form style={{display:"grid"}}>
                    
                      
                      <Button  className="btn-fill pull-right" type="submit" variant="success" onClick={this.paid} > {translate('Paid vacation')}</Button>
                      <br></br>
                      <br></br>
                      <Button  className="btn-fill pull-right" type="submit" variant="success" onClick={this.unpaid} > {translate('Unpaid vacation')}</Button>
                      <br></br>
                      <br></br>
                      <Button  className="btn-fill pull-right" type="submit" variant="success" onClick={this.exception}> {translate('Exceptional vacation')}</Button>
                      <br></br>
                      <br></br>
                      <Button  className="btn-fill pull-right" type="submit" variant="success" onClick={this.recovery}>{translate('Recovery vacation')} </Button>
                      <br></br>
                      <br></br>
                      <Button className="btn-fill pull-right" type="submit" variant="success" >{translate('Historic')}</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>


              
            </Row>
          </Container>
        );
    }
}

export default Vacationrequest