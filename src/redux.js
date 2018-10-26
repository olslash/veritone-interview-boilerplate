import { fetchCompanySearchResults } from "./api";

// ****
// Reducer
// ****

const defaultState = {
  companies: [],
  loading: false,
  failure: false
};

const posts = (state = defaultState, action) => {
  switch (action.type) {
    case "SEARCH_COMPANIES":
      return {
        companies: state.companies,
        failure: false,
        loading: true
      };
    case "SEARCH_COMPANIES_SUCCESS":
      return {
        companies: action.companies,
        failure: false,
        loading: false
      };
    case "SEARCH_COMPANIES_FAILURE":
      return {
        companies: [],
        failure: true,
        loading: false
      };
    default:
      return state;
  }
};
export default posts;

// ****
// Selectors
// ****

export const selectCompanies = state => state.companies.companies;
export const companiesAreLoading = state => state.companies.loading;
export const companiesFailedToLoad = state => state.companies.failure;

// ****
// Actions
// ****

export const searchCompanies = name => dispatch => {
  dispatch({
    type: "SEARCH_COMPANIES"
  });

  fetchCompanySearchResults(name)
    .then(companies =>
      dispatch({
        type: "SEARCH_COMPANIES_SUCCESS",
        companies
      })
    )
    .catch(e =>
      dispatch({
        type: "SEARCH_COMPANIES_FAILURE"
      })
    );
};
