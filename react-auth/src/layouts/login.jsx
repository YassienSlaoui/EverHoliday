import React, { Component } from 'react'
import collaboratorService from '../servicees/CollaborateurServices';
import AuthService from '../servicees/AuthServices';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../com/css/login.css' 
import { withRouter } from 'react-router-dom';
import { Alert} from "react-bootstrap";
class Alogin extends Component {
   constructor(props) {
        super(props)

      this.state = {
            id: "",
            password:"",  
            username:""
            
            
        }
        this.changeusernameHandler = this.changeusernameHandler.bind(this);
        this.changepasswordHandler = this.changepasswordHandler.bind(this);
        this.login = this.login.bind(this);
    }

   
    login = (e) => {
      e.preventDefault();     
      sessionStorage.setItem('token',"");
      sessionStorage.setItem('user',"");
      sessionStorage.setItem('role',"");
      sessionStorage.setItem('user1',"");
        
          AuthService.user(this.state.username, this.state.password).then( res => {
            sessionStorage.setItem('user',JSON.stringify(res.data.id))
            sessionStorage.setItem('user1',JSON.stringify(res.data))
            
        })
          AuthService.role(this.state.username, this.state.password).then( res => {
            sessionStorage.setItem('role',JSON.stringify(res.data).replace('"','').slice(0, -1))
        }
        
        )
        
        AuthService.login(this.state.username, this.state.password).then( res => {
          sessionStorage.setItem('token',JSON.stringify(res.data.token).replace('"','').slice(0, -1))
          this.props.history.push('/admin/Home');
        },
        err=> {
          alert('password or username are not correct')
         
        }
        
        )
      
    
      }
  
      changeusernameHandler= (event) => {
        this.setState({username: event.target.value});
        
    }
    changepasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }
    render() {
        return (
          
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
            
              <Typography component="h3" variant="h5">
                EverHoliday
              </Typography>
              <form className="form" noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={this.changeusernameHandler}
                  fullWidth
                  id="email"
                  label="Matricule"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={this.changepasswordHandler}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
      
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.login}
                  
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" thHref="/@{/forgot_password}" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  
                </Grid>
              </form>
            </div>
          
          </Container>
            
        );
    }
}

export default withRouter(Alogin);