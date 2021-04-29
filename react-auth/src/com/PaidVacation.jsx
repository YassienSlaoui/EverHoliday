import React, { Component } from 'react'
import HolidayService from '../servicees/HolidayService'
import BalanceService from '../servicees/BalanceService'
import Calendar from '../com/calendor/calendar3'
class PaidVacation extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            balance: []
        }
        
       // this.saverequestvacationpaid = this.saverequestvacationpaid.bind(this);
    }

    // step 3
    
    /*saverequestvacationpaid = (e) => {
        e.preventDefault();
        let holiday = {date_start: this.state.datestart, date_end: this.state.date, duration: this.state.duration};
        console.log('vacation => ' + JSON.stringify(RequestVacationPaid));
         BalanceService.createRequestVacationPaid(RequestVacationPaid).then(res =>{
        this.props.history.push('/admin/RequestVacation/History');});
    }*/
    
/*
    cancel(){
        this.props.history.push('/admin/RequestVacation/History');
    }*/

    
    render() {
        return (
            
            <div>
               {/*  <h2 className="text-center">Paid request</h2> */}
                <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-7">
                                <div className = "card-body">
                                    <form>
                                        {/* <div className = "form-group">
                                            <label>Name: </label>
                                            <input placeholder="name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changenameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> date </label>
                                            <input placeholder="date" name="date" className="form-control" 
                                                value={this.state.date} onChange={this.changedateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> duration </label>
                                            <input placeholder="duration" name="duration" className="form-control" 
                                                value={this.state.duration} onChange={this.changedurationHandler}/>
        </div>*/}
                                        <select>
                                            <option defaultValue value="Fullday">Full-day</option>
                                            <option value="Halfday">Half-day</option>
                                            <option value="Hours">Hours</option>
                                        </select>
                                        <br></br>
                                        {/*<br></br>
                                        <div className = "form-group">
                                        <label for="start" >Start date:</label>
                                        <input type="date" id="startd" name="start-date" 
                                        min="2021-01-04" max="9999-12-31"></input>
                                        </div>

                                        <br></br>
                                        <div className = "form-group">
                                        <label for="start">End date:</label>
                                        <input type="date" id="endd" name="end-date"
                                        min="2021-01-04" max="9999-12-31"></input>
                                        </div> */}
                                        <br></br>
                                        <div className = "form-group">
                                        <Calendar/>
                                        </div>
                                        <br></br>
                              
                                        
                                        <div className = "form-group">
                                        <label htmlFor="CumulativeB" >Cumulative balance: </label>
                                        {/*<label type="number" id="CumulativeB" name="Cumulative balance" >{balance.cumelative}</label>*/}
                                        </div>
                                        <div className = "form-group">
                                        <label htmlFor="AnnualB" >Annual balance: </label>
                                       {/* <label type="number" id="AnnualB" name="Annual balance" >{balance.annual}</label>*/}
                                        </div>
                                        <div className = "form-group">
                                        <label htmlFor="PendingB" >Balance of pending requests: </label>
                                        {/*<label type="number" id="AnnualB" name="balance of pending requests" >{balance.pending}</label>*/}
                                        </div>
                                    
                                        <br></br>
                                        <div className = "form-group">
                                        <label htmlFor="description">description:</label>
                                        <br></br>
                                        <textarea id="description" name="description" rows="3" cols="72">
                                        </textarea>
                                        </div>
                                        <br></br>
                                        
                                        
                                        <button className="btn btn-success" >Save</button>
                                        <button className="btn btn-danger"  style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                          
                        </div>
                        </div>
                </div>
         
        )
    }
}

export default PaidVacation 