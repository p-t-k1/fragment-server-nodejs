import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from '../middleware/admin';
import auth from '../middleware/auth';

const userEndpoint = (router) => {
    router.post('/api/user/auth', async (request, response, next) => {
        console.log(JSON.stringify(request.body))
        try {
            let result = await business.getUserManager(request).authenticate(request.body.login, request.body.password);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/create', async (request, response, next) => {
        try {
            const result = await business.getUserManager(request).createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/notes/findAll', async (request, response, next) => {
        try {
            const result = await business.getNoteManager(request).findAllNotes(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/notes/findUserBooks', async (request, response, next) => {
        try {
            const result = await business.getNoteManager(request).findUserBooks(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/notes/saveNote', async (request, response, next) => {
        try {
            const result = await business.getNoteManager(request).createNewNote(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/notes/delete', async (request, response, next) => {
        try {
            let result = await business.getNoteManager(request).removeNoteById(request.body.noteId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/logout/:userId', async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).removeHashSession(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });


};

export default userEndpoint;
