import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarContainer from '../browse/searchbar_container';

class Navbar extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      queryString: ""
    };

    if(props.currentUser !== undefined){
      this.username = props.currentUser.email;
      if(this.username.includes("@")){
        this.username = this.username.split("@")[0];
      }
    }

    this.updatePath = this.updatePath.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
  }

  updatePath(e) {
    this.props.history.push(`/browse/search?=${e.target.value}`);
    this.setState({queryString: e.target.value});
  }

  collapse(){
    this.props.history.push('/browse');
    document.getElementById("search-controls").classList.remove('white');
    document.getElementById("search-input").classList.remove('not-displayed');
    document.getElementById("search-input").value="";
    document.getElementById("search-closer").classList.remove('close-width');
  }

  expand(){
    this.props.history.push('/browse/search?=');
    document.getElementById("search-controls").classList.add('white');
    document.getElementById("search-input").classList.add('not-displayed');
    document.getElementById("search-input").focus();
    document.getElementById("search-closer").classList.add('close-width');
  }

  render(){

    if (this.props.currentUser === undefined) {
      return (
        <div></div>
      );
    } else {
      return (
        <div>
          <div className="main-header">
            <div>
              <Link to="/">
                <img className="main-logo" src="https://fontmeme.com/permalink/181212/c5c4b3134061f86d06de9895b1ea5522.png" border="0" />
              </Link>
            </div>
            <div className="nav-items">
              <div className="nav-links">
                <Link className="nav-link-item" to="/">Home</Link>
                <Link className="nav-link-item" to="/list">My List</Link>
              </div>
              <div className="nav-controls">
                  <div className="nav-items wsearch">

                    <div id="search-controls" className="search-controls">

                      <div className="search-btn" onClick={() => this.expand()} >

                        <i className="fa fa-search"></i>
                      </div>
      
                      <input id="search-input" type="text" placeholder="Search by title" defaultValue="" onChange={this.updatePath}/>

                      <div id="search-closer" className="search-btn search-closer" onClick={() => this.collapse()} >
                        <i className="fa fa-times"></i>
                      </div>
                    </div>

                    <div className="profile-dropdown" >
                      <img className="profile-logo" src="https://assets.nflxext.com/ffe/profiles/avatars_v2/32x32/PICON_025.png" alt=""/>
                      <i className="fa fa-caret-down"></i>
                    </div>
                    <div id="my-dropdown" className="dropdown-content" onMouseOver={() => {
                      const openDropdown = document.getElementById("my-dropdown");
                      if (!openDropdown.classList.contains('show')) {
                        openDropdown.classList.add('show');
                      }
                    }} onMouseOut={() => {
                      const openDropdown = document.getElementById("my-dropdown");
                      if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                      }
                    }}>
                        <section className="drop-item manage-link" >Hello, {this.username}!</section>
                        <section className="drop-item" onClick={() => this.props.logout()}>Logout of Chillflix</section>
                      </div>
                    </div>
                    <div className="nav-control-wrapper" onMouseOver={() => {
                      const openDropdown = document.getElementById("my-dropdown");
                      if (!openDropdown.classList.contains('show')) {
                        openDropdown.classList.add('show');
                      }
                  }} onMouseOut={() => {
                  const openDropdown = document.getElementById("my-dropdown");
                  if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                  }
                }}></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Navbar;
