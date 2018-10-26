import React, { Component } from "react";
import { connect } from "react-redux";
import { find } from "lodash";

import {
  selectCompanies,
  searchCompanies,
  companiesAreLoading,
  companiesFailedToLoad
} from "./redux";

const mapStateToProps = state => ({
  companies: selectCompanies(state),
  companiesAreLoading: companiesAreLoading(state),
  companiesFailedToLoad: companiesFailedToLoad(state)
});

const mapDispatchToProps = dispatch => ({
  searchCompanies: string => dispatch(searchCompanies(string))
});

class Posts extends Component {
  static defaultProps = {
    companies: []
  };

  state = {
    value: "",
    selectedCompanyId: null
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      value
    });
  };

  selectCompany = id => {
    this.setState({
      selectedCompanyId: id
    });
  };

  search = () => {
    this.props.searchCompanies(this.state.value);
  };

  render() {
    const selectedCompany = find(this.props.companies, {
      id: this.state.selectedCompanyId
    });

    return (
      <div>
        <input value={this.state.value} onChange={this.handleInputChange} />
        <button onClick={this.search}>Search</button>
        {this.props.companiesAreLoading && "loading..."}
        {this.props.companiesFailedToLoad && "Failed. please try again."}
        <div>
          <em>Selected company description:</em>
          <p>{selectedCompany && selectedCompany.description}</p>
        </div>
        results:
        <ul>
          {this.props.companies.map(({ name, description, id }) => (
            <li>
              <button onClick={() => this.selectCompany(id)} key={id}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
