import _fetch from 'isomorphic-fetch';

const handleResponse = (response, requestData)=> {
  const valid = response.status >= 200 && response.status <= 399;
  if (!valid) {
    const responseData = {
      locLocation: 'Error during fetch request in ContextualHelp',
      status: response.status,
      statusText: response.statusText,
      url: response.url
    };

    const error = {
      errorData: new Error('Error during fetch request in ContextualHelp'),
      requestData,
      responseData
    };

    throw error;
  }

  return response.text().then((text) => {
    const res = text ? JSON.parse(text) : {};
    return res;
  })
};

const fetch = (url) => {
  if (!url && typeof url !== 'string') {
    return
  }

  const payload = {};

  const requestData = {
    method: 'GET',
    headers: {}
  }

  return _fetch(url, requestData)
  .then((response) => handleResponse(response, requestData))
  .catch((error) => {
    const errorObj = {
      logLocation: url,
      errorMessage: error.errorData && error.errorData.Message,
      errorStack: (error.errorData && error.errorData.stack) || 'No stack provided',
      errorStatus: (error.responseData && error.responseData.status) || 1,
      errorRequestData: requestData,
      errorResponseData: error.responseData
    };

    throw errorObj;
  });
};

export default fetch;
