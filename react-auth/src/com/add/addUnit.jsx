import React, { Component } from 'react'
import UnitService from '../../servicees/UnitService';
import collaboratorService from '../../servicees/CollaborateurServices';
import Select from 'react-select';
import translate from "../../i18nProvider/translate"
class addUnit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            validator: '',
            collaborators:[],
            selected:[],
            options:[],
            value5: [],
            value:[],
            value1:[],
            collaborator: [],
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changevalidatorHandler = this.changevalidatorHandler.bind(this);
        this.changecollaboratorHandler = this.changecollaboratorHandler.bind(this);
        this.saveOrUpdateHoliday = this.saveOrUpdateHoliday.bind(this);
    }
    // get collaborator and unit if user click in update
    componentDidMount(){
        collaboratorService.getUser().then((res) => {
            this.setState({ collaborator: res.data,
                options : res.data.map(
                    user => {
                        return { value: user, label: user.firstname+" "+user.lastname };
                    }
            )
        });
    })
        if(this.state.id === 'add'){
            return
        }else{
            UnitService. getunitById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({
                    id:user.id,
                    name:user.name,
                    validator:user.validator,
                    collaborators: user.collaborators1,
                    value :this.state.options.filter(option => option.value.id === user.validator.id)[0],
                    value1:this.state.options.filter(option=>{
                        for (const element of user.collaborators1){
                            if(element.id===option.value.id)
                            return option
                        }     
                    })
                });
               
            });
        }
    }
        saveOrUpdateHoliday = (e) => {
            
            if(this.state.value1.length==0||this.state.value.length==0){
                alert('-----------------')
            }else{
            e.preventDefault();
            let holiday = {
                    name:this.state.name,
                    validator:this.state.value.value,
                    collaborators:this.state.value1.map(user => user.value)
            };     
            console.log(holiday)
              if(this.state.id === "add"){
                    UnitService.createunit(holiday).then(res =>{
                        this.props.history.push('/admin/units/list');
                    });
                }else{
                    UnitService.updateunit(holiday, this.state.id).then( res => {
                        this.props.history.push('/admin/units/list');
                    });
                }  }
        }
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changevalidatorHandler= (validator) => {
        this.setState({value:validator});
        
    }
    changecollaboratorHandler= (collaborators1) => {
        this.setState({value1:collaborators1});
    }
    cancel(){
        this.props.history.push('/admin/units/list');
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
                                            <label>{translate('Name')}: </label>
                                            <input placeholder="name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changenameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> {translate('validator')} </label>
                                            <Select 
                                                value={this.state.value}
                                                 onChange={change=>this.changevalidatorHandler(change)}
                                                 options={this.state.options}
                                                 />
                                                
                                        </div>
                                        <div className = "form-group">
                                            <label> {translate('collaborator')} </label>
                                           
                                                 <Select 
                                                 isMulti
                                                 onChange={change=>this.changecollaboratorHandler(change)}
                                                value={this.state.value1}

                                                 options={this.state.options}
                                                 />
                                            
                                        </div>
                                        
                                        <button className="btn btn-success" onClick={this.saveOrUpdateHoliday}>{translate('Save')}</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>{translate('Cancel')}</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
     )
    }
}

export default addUnit 