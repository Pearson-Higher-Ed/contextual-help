import { handleResponse } from '../src/js/chFetch';

describe('chFetch',() => {
  const jsonResponse = { prop1: 'some', prop2: 'stuff' };
  const json = function() { return jsonResponse};
  const requestData = {
    reqProp1: 'other',
    reqProp2: 'things'
  };

  it('should handleResponse for valid data', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      json: json,
      url: 'http://not.a.real.url.json'
    };
    const result = handleResponse(response, requestData);
    expect(result).toEqual(jsonResponse);
  });

  it('should handleResponse for invalid data', () => {
    const response = {
      status: 404,
      statusText: 'Not Found',
      json: json,
      url: 'http://not.a.real.url.json'
    };
    expect(() => {handleResponse(response, requestData)}).toThrow();
  });
});
