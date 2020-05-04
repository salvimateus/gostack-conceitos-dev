const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

/**
 * Métodos HTTP
 * - GET
 * - POST
 * - PUT/PATCH: atualizar cadastro inteiro / só avatar, etc
 * - DELETE
**/

/**
 * Tipos de parâmetros
 * - Query Params: filtros e paginação
 * - Route Params: identificar recursos
 * - Request Body: conteúdo na criação/edição de um recurso (JSON)
**/

/**
 * Middleware: interceptador de requisições (interrompe ou altera)
**/

const projects = [];

function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method}] ${url}`;

    // console.log('1');
    console.time(logLabel);

    next();

    // console.log('2');
    console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if(! isUuid(id)) {
        // qualquer return dentro de middleware irá impedir o next()
        return response.status(400).json({ error: 'Invalid ID' });
    }

    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    // console.log('3');
    const { title } = request.query;

    // console.log(nome);
    // console.log(idade);
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    // console.log(title);
    // console.log(owner);
    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    // console.log(id);
    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({ error: "Not found!!!" });
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({ error: "Not found!!!" });
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('🚀 → Backend started!');
});