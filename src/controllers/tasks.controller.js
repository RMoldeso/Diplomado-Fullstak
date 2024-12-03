import { Task } from "../models/tasks.js";
import logger from "../logs/logger.js";

async function getTasks(req, res) {
    const {UserId} = req.user;
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'],
            order: [['name', 'ASC']],
            where: {
            UserId
            }
        });
        res.json(tasks);
    } catch (error) {
        logger.error('Error getTask: ', + error);
        res.status(500).json({ message: 'server error' });        
    }
}

async function createTask(req, res) {
    const { UserId } = req.user;
    const { name } = req.body;
    try {
        const task = await Task.create({
            name,
            UserId
        });
    res.json(task);
    } catch (error) {
        logger.error('Error createTask: ', + error);
        res.status(500).json({ message: 'Server error' });        
    }
}

async function getTask(req, res) {
    const { id } = req.params;
    const { UserId } =req.user;
    try {
        const task = await Task.findOne({
            attributes: ['name', 'done'],
             where: { 
                id, 
                UserId,
             },
         })     
    res.json(task);   
    } catch (error) {
        logger.error('Error getTask: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateTask(req, res) {
    const { id } = req.params;
    const { UserId } = req.user;
    const { name } = req.body;
    try {
        const task = await Task.update({ name }, { where: { id, UserId } });
        if (task [0] === 0)
            return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        logger.error('Error updateTask: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
};

async function taskDone(req, res) {
    const { id } = req.params;
    const { UserId } = req.user;
    const { done } = req.body;
    try {
        const task = await Task.update({ done }, { where: { id, UserId } });
        if (task [0] === 0)
            return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        logger.error('Error taskDone: '+ error);
        res.status(500).json({ message: 'Server error' });
    }
    
}

async function deleteTask(req, res) {
    const { id } = req.params;
    const { UserId } = req.user;
    try {
        const task = await Task.destroy({where: { id, UserId } });
        if (task === 0)
            return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        logger.error('Error deleteTask: '+ error);
        res.status(500).json({ message: 'Server error' });
     }
    }

    export default {
        getTasks,
        createTask,
        getTask,
        updateTask,
        taskDone,
        deleteTask,
    }
