const { prisma } = require("../config/db");
exports.GetTsks = async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json({ status: 200, success: true, data: tasks });
};
exports.GetTsk = async (req, res) => {
  const { Id } = req.params;
  const Taskid = parseInt(Id);
  const Task = await prisma.task.findUnique({ where: { id: Taskid } });
  if (!Task) {
    return res
      .status(404)
      .json({ success: false, message: `Id ${Id} is not found ` });
  }
  res.json({ status: 200, success: true, data: Task });
};
exports.CreateTsk = async (req, res) => {
  const { description, title } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: `title is required` });
  }
  const NewTask = await prisma.task.create({ data: { title, description } });
  res.status(201).json({ success: true, data: NewTask });
};
exports.UpDateTask = async (req, res) => {
  const { Id } = req.params;
  const Taskid = parseInt(Id);

  const Task = await prisma.task.findUnique({ where: { id: Taskid } });
  if (!Task) {
    return res
      .status(404)
      .json({ success: false, message: `Id ${Id} Not found ` });
  }
  const { description, title, completed } = req.body;
  const UpTask = await prisma.task.update({
    where: {
      id: Taskid,
    },
    data: {
      description,
      title,
      completed,
    },
  });
  res.status(200).json({ success: true, data: UpTask });
};
exports.DeletTask = async (req, res) => {
  const { Id } = req.params;
  const Taskid = parseInt(Id);
  try {
    if (isNaN(Taskid)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid task ID" });
    }
    const Task = await prisma.task.findUnique({ where: { id: parseInt(Id) } });
    if (!Task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    await prisma.task.delete({ where: { id: Taskid } });
    res.status(200).json({ success: true, data: "Task deleted successfully"});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the task",
      error: error.message,
    });
  }
};
