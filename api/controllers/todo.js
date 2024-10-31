import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTodo = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.user_id,
      },
      include: {
        todos: true,
      },
    });
    if (!user) return res.status(400).json({ message: "User doesn't exists" });

    const todo = await prisma.todo.create({
      data: {
        todoText: req.body.todoText,
        userId: req.params.user_id,
      },
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        todos: {
          set: [...user.todos, todo],
        },
      },
    });

    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const getUserTodos = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.user_id,
      },
      include: {
        todos: true,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user.todos);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTodo)
      return res
        .status(403)
        .json({ message: "To-Do not found and not deleted" });

    return res.status(204).json({ message: "To-Do deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
};
