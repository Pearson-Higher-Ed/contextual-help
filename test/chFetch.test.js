import { handleResponse } from '../src/js/chFetch';

it('should handleResponse for valid data', () => {
  const jsonResponse = { prop1: 'some', prop2: 'stuff' };
  const json = function() { return jsonResponse};
  const response = {
    status: 200,
    statusText: 'OK',
    json: json,
    url: 'http://not.a.real.url.json'
  };
  const requestData = {
    reqProp1: 'other',
    reqProp2: 'things'
  };
  const result = handleResponse(response, requestData);
  expect(result).toEqual(jsonResponse);
});

it('should handleResponse for invalid data', () => {
  const jsonResponse = { prop1: 'some', prop2: 'stuff' };
  const json = function() { return jsonResponse};
  const response = {
    status: 404,
    statusText: 'Not Found',
    json: json,
    url: 'http://not.a.real.url.json'
  };
  const requestData = {
    reqProp1: 'other',
    reqProp2: 'things'
  };
  expect(() => {handleResponse(response, requestData)}).toThrow();
});
