import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: 'mattography',
      userData: [],
      userRepos: [],
      perPage: 10
    }
  }

  // Get user data from github
  getUserData(){
    $.ajax({
      url: 'https://api.github.com/users/' +this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userData: data});
      }.bind(this),
      error: function(xhr, status, error){
      this.setState({username: null});
        alert(error);
      }.bind(this)
    });
  }

  //get user repos
  getUserRepos(){
    $.ajax({
      url: 'https://api.github.com/users/' +this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userRepos: data});
      }.bind(this),
      error: function(xhr, status, error){
      this.setState({username: null});
        alert(error);
      }.bind(this)
    });
  }
  handleFormSubmit(username){
    this.setState({username: username}, function(){
      this.getUserData();
      this.getUserRepos();
    });
  }

  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }

  render(){
    return(
        <div>
          <Search onFormSubmit = {this.handleFormSubmit.bind(this)} />
          <Profile {...this.state}/>
        </div>
    )
  }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};
App.defaultProps = {
  clientId: '32e85bae74e9cd1261a5',
  clientSecret: '8d1108511f20af55c119c5320321daca77ecf47c'
}

export default App
