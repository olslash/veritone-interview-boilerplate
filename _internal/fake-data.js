import faker from "faker";

const fakeCompanyNames = Array(500)
  .fill(null)
  .map(() => faker.company.companyName());

const fakeCompanyDescriptions = Array(500)
  .fill(null)
  .map(() => faker.company.catchPhrase());

export let companies = fakeCompanyNames.map((name, i) => ({
  id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  name,
  description: fakeCompanyDescriptions[i]
}));
