"use server";

import dbConnect from "./database/connect";
import Task from "./database/task.model";

export async function getTasks() {
  await dbConnect();

  try {
    const tasks = await Task.find({});
    return tasks.slice(0).reverse().map((data:any) => data);
  } catch (err) {
    console.log(err);
  }
}

export async function createTask(params: {
  description: string;
  status: string;
  title:string;
}) {
  await dbConnect();

  const {  description, status, title} = params;

  try {
    const newTask = await Task.create({ title, description, status });

    console.log(newTask)
    return newTask;
  } catch (err) {
    console.log(err);
  }
}
