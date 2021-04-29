import React, { Component } from 'react'
import HolidayService from '../../servicees/HolidayService'
import dateFormat from "dateformat";
class Addholiday extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            date: '',
            duration: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changedurationHandler = this.changedurationHandler.bind(this);
        this.changedateHandler = this.changedateHandler.bind(this);
        this.saveOrUpdateHoliday = this.saveOrUpdateHoliday.bind(this);
    }

    // step 3
    
    componentDidMount(){
      
        // step 4
        if(this.state.id === 'add'){
            return
        }else{
            HolidayService.getHolidayById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({
                    id:user.id,
                    name:user.name,
                    date:user.date,
                    duration:user.duration
                });
            });
        }
    }
        saveOrUpdateHoliday = (e) => {
            e.preventDefault();
            let holiday = {
                    name:this.state.name,
                    date:this.state.date,
                    duration:this.state.duration
            };     
                if(this.state.id === "add"){
                    HolidayService.createholiday(holiday).then(res =>{
                        this.props.history.push('/admin/holidays');
                    });
                }else{
                    HolidayService.updateHoliday(holiday, this.state.id).then( res => {
                        this.props.history.push('/admin/holidays');
                    });
                }   
        }
    
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changedurationHandler= (event) => {
        this.setState({duration: event.target.value});
    }

    changedateHandler= (event) => {
        this.setState({date: dateFormat(event.target.value, "yyyy-mm-dd")});
        
    }

    cancel(){
        this.props.history.push('/admin/holidays');
    }

    
    render() {
        return (
            
            <div>
                <br></br>
                <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>Name: </label>
                                            <input placeholder="name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changenameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> date </label>
                                            <input placeholder="date" name="date" className="form-control" 
                                               type="date" value={this.state.date} onChange={this.changedateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> duration </label>
                                            <input placeholder="duration" name="duration" className="form-control" 
                                                value={this.state.duration} onChange={this.changedurationHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateHoliday}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        )
    }
}

export default Addholiday 