import React, { Component } from 'react'
import UnitService from '../../servicees/UnitService';
import collaboratorService from '../../servicees/CollaborateurServices';
import Select from 'react-select';
import {FormattedMessage} from "react-intl";
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
class addUnit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            validator: '',
            collaborators:'',
            selected:'',
            collaborator: []
        }
        
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changevalidatorHandler = this.changevalidatorHandler.bind(this);
        this.changecollaboratorHandler = this.changecollaboratorHandler.bind(this);
        this.saveOrUpdateHoliday = this.saveOrUpdateHoliday.bind(this);
    }

    // step 3
    
    componentDidMount(){
        // step 4
        
        collaboratorService.getUser().then((res) => {
            this.setState({ collaborator: res.data});
        });
        
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ];
        if(this.state.id === 'add'){
            return
        }else{
            UnitService. getunitById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({
                    id:user.id,
                    name:user.name,
                    validator:user.validator,
                    collaborators:user.collaborators,
                   // selected:{value:user.validator,label:user.validator.firstname +" "+user.validator.lastname}
                });
            });
        }
    }
        saveOrUpdateHoliday = (e) => {
            
            if(this.state.collaborators[0].value===undefined||this.state.validator.value===undefined){
                alert('-----------------')
            }else{

            
            e.preventDefault();
            let holiday = {
                    name:this.state.name,
                    validator:this.state.validator.value,
                    collaborators:this.state.collaborators.map(user => user.value)
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
                }   }
        }
    
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changevalidatorHandler= (validator) => {
        this.setState({validator});
        
    }

    changecollaboratorHandler= (collaborators) => {
        this.setState({collaborators});
        
        
    }

    cancel(){
        this.props.history.push('/admin/units/list');
    }

    
    render() {
        
        /*let options = this.state.collaborator.map(
            user => {
                console.log(user)
                return { value: user, label: user.firstname };
            }
            value={options.filter(option => option.label === this.state.validator.firstname +" "+this.state.validator.lastname)}
          )*/
          
         let options = this.state.collaborator.map(
            user => 
           {return { value: user, label: user.firstname +" "+user.lastname }; })
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
                                                    
                                                 onChange={this.changevalidatorHandler}
                                              
                                                 options={options}
                                                 />
                                                
                                        </div>
                                        <div className = "form-group">
                                            <label> {translate('collaborator')} </label>
                                           
                                                 <Select 
                                                 isMulti
                                                 onChange={this.changecollaboratorHandler}
                                                 options={options}
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