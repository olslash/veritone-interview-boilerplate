import { companies } from "../_internal/fake-data";

export function fetchCompanySearchResults(string = "") {
  const results = companies.filter(({ name }) =>
    name.toLowerCase().includes(string.toLowerCase())
  );

  const willFail = Math.random() < 0.2;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      willFail ? reject(new Error()) : resolve(results);
    }, 500);
  });
}

export function addCompany({ name, description }) {
  const willFail = Math.random() < 0.2;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willFail) {
        return reject(new Error());
      }

      const newCompany = {
        name,
        description,
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      };

      companies.push(newCompany);
      resolve(newCompany);
    }, 500);
  });
}
