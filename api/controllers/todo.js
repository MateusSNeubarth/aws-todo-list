import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTodo = async (req, res) => {
    try {
        const todo = await prisma.user.findUnique({
            where: {
                todoText: req.body.todoText,
                user_id: req.params.user_id
            }
        });
        if (todo) return res.status(403).json({ message: "To-Do already exists" });

        await prisma.todo.create({
            data: {
                todoText: req.body.todoText,
                user_id: req.params.user_id,
            },
        });

        res.status(200).send("User has been created");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export const getUserTodos = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.user_id,
            },
        });
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json(user.todos)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await prisma.todo.delete({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedTodo) return res.status(403).json({ message: "To-Do not found and not deleted" });

        return res.status(204).json({ message: "To-Do deleted" });
    } catch (err) {
        res.status(500).send(err);
    }
}