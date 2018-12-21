import { connect } from 'react-redux';
import SearchResults from './search_results';
import { withRouter } from 'react-router-dom';
import { fetchMovies } from '../../actions/movies_actions';


const mstp = (state, ownProps) => {
  let pathname = window.location.href;
  let query = "";
  if (pathname.includes('search?=')) {
    query = pathname.split('=')[1];
  }

  return ({
    movies: Object.values(state.entities.movies),
    query: query
  });
};


const mdtp = (dispatch) => {
  return ({
    fetchMovies: () => dispatch(fetchMovies())
  });
};

export default withRouter(connect(mstp, mdtp)(SearchResults));