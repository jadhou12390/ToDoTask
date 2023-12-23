﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    public class ToDoListController : Controller
    {
        private readonly AppDbContext _context;
        public ToDoListController()
        {
            _context = new AppDbContext();
        }
        [HttpGet]
        public ActionResult Index(int listId)
        {
            var tasksForList = _context.ToDoTasks.Where(tasks => tasks.ListId == listId).ToList();
            return View("ToDoListView", tasksForList);
        }
        
       
        [HttpPost]
        public ActionResult Create(ToDoTask viewModel)
        {
            if (ModelState.IsValid)
            {
                var newToDoTask = new ToDoTask
                {
                    TaskName = viewModel.TaskName,
                    IsCompleted = viewModel.IsCompleted,
                    ListId = viewModel.ListId
                };

                _context.ToDoTasks.Add(newToDoTask);
                _context.SaveChanges();

                return Json(new { success = true, id = newToDoTask.Id, isCompleted = newToDoTask.IsCompleted });
            }

            return Json(new { success = false, message = "Model state is not valid." });
        }
    
    [HttpPost]
        public ActionResult Delete(int Id) {

            try
            {
                // Your update logic here
                // For example, you might use a service or repository to update the student in the database
                // Make sure to implement proper error handling and validation as needed

                // Sample update logic
                var taskToDelete = _context.ToDoTasks.Find(Id);
                if (taskToDelete != null)
                {
                    _context.ToDoTasks.Remove(taskToDelete);
                    _context.SaveChanges();

                    return Json(new { success = true, message = "Task Deleted successfully" });
                }
                else
                {
                    return Json(new { success = false, message = "Task not found" });
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return Json(new { success = false, message = "An error occurred while updating the student" });
            }
        }
        [HttpPost]
        public ActionResult Edit(int task_id,string task_name,bool isCompleted)
        {

            try
            {
                // Your update logic here
                // For example, you might use a service or repository to update the student in the database
                // Make sure to implement proper error handling and validation as needed

                // Sample update logic
                var taskToUpdate = _context.ToDoTasks.Find(task_id);
                if (taskToUpdate != null)
                {
                    taskToUpdate.TaskName = task_name;
                    taskToUpdate.IsCompleted = isCompleted;
                    _context.SaveChanges();

                    return Json(new { success = true, message = "Task Updated successfully" });
                }
                else
                {
                    return Json(new { success = false, message = "Task not found" });
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return Json(new { success = false, message = "An error occurred while updating the student" });
            }




        }
    }
}