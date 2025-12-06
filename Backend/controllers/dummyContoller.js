import { getDummyMessage } from '../service/dummyService.js';

export const dummyTask = async (req, res, next) => {
    try {
        const result = await getDummyMessage();
        res.json(result);
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};