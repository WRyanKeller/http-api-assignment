const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, xmlBody) => {
    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(xmlBody);
    response.end();
}

const getSuccess = (request, response) => {
    let statusCode = 200;
    let message = 'This is a successful response';

    if (request.headers.accept.split(',')[0] === 'text/xml')
    {
        let xmlBody = '<response><message>' + 
            message +
            '</message></response>'

        return respondXML(request, response, statusCode, xmlBody);
    }

    const responseJSON = {
        message
    };

    return respondJSON(request, response, statusCode, responseJSON);
};

const getBadRequest = (request, response, params) => {
    let statusCode = 400;
    let message = 'Missing valid query parameter set to true';

    if (params.valid === 'true') {
        statusCode = 200;
        message = 'This request has the required parameters';
    }

    if (request.headers.accept.split(',')[0] === 'text/xml')
    {
        let xmlBody = '<response><message>' + message + '</message>';
        if (statusCode === 400) xmlBody += '<id>badRequest</id>'
        xmlBody += '</response>';
        
        return respondXML(request, response, statusCode, xmlBody);
    }

    const responseJSON = {
        message
    };

    if (statusCode === 400) responseJSON['id'] = 'badRequest';

    return respondJSON(request, response, statusCode, responseJSON);
};

const getUnauthorized = (request, response, params) => {
    let statusCode = 401;
    let message = 'Missing loggedIn query parameter set to yes';

    if (params.loggedIn === 'yes') {
        statusCode = 200;
        message = 'You have successfully viewed the content';
    }

    if (request.headers.accept.split(',')[0] === 'text/xml')
    {
        let xmlBody = '<response><message>' + message + '</message>';
        if (statusCode === 401) xmlBody += '<id>unauthorized</id>'
        xmlBody += '</response>';
        
        return respondXML(request, response, statusCode, xmlBody);
    }

    const responseJSON = {
        message
    };

    if (statusCode === 401) responseJSON['id'] = 'unauthorized';

    return respondJSON(request, response, statusCode, responseJSON);
};

const getForbidden = (request, response) => {
    let statusCode = 403;
    let message = 'You do not have access to this content.';
    let id = 'forbidden';

    if (request.headers.accept.split(',')[0] === 'text/xml')
    {
        let xmlBody = '<response><message>' + 
            message + '</message><id>' +
            id + '</id></response>';

        return respondXML(request, response, statusCode, xmlBody);
    }

    const responseJSON = {
        message,
        id
    };

    return respondJSON(request, response, statusCode, responseJSON);
};

const getInternal = (request, response) => {
    let statusCode = 500;
    let message = 'Internal Server Error. Something went wrong.';
    let id = 'internalError';

    if (request.headers.accept.split(',')[0] === 'text/xml')
    {
        let xmlBody = '<response><message>' + 
            message + '</message><id>' +
            id + '</id></response>';

        return respondXML(request, response, statusCode, xmlBody);
    }

    const responseJSON = {
        message,
        id
    };

    return respondJSON(request, response, statusCode, responseJSON);
};

const getNotImplemented = (request, response) => {
    let statusCode = 501;
    let message = 'A get request for this page has not been implemented yet. Check again later for updated content.';
    let id = 'notImplemented';

    if (request.headers.accept.split(',')[0] === 'text/xml')
    {
        let xmlBody = '<response><message>' + 
            message + '</message><id>' +
            id + '</id></response>';

        return respondXML(request, response, statusCode, xmlBody);
    }

    const responseJSON = {
        message,
        id
    };

    return respondJSON(request, response, statusCode, responseJSON);
};

const getNotFound = (request, response) => {
    let statusCode = 404;
    let message = 'The page you are looking for was not found.';

    if (request.headers.accept.split(',')[0] === 'text/xml')
    {
        let xmlBody = '<response><message>' + 
            message +
            '</message></response>'

        return respondXML(request, response, statusCode, xmlBody);
    }

    const responseJSON = {
        message
    };

    return respondJSON(request, response, statusCode, responseJSON);
};

module.exports = {
    getSuccess,
    getBadRequest,
    getUnauthorized,
    getForbidden,
    getInternal,
    getNotImplemented,
    getNotFound
};