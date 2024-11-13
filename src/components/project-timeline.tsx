'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

export function ProjectTimeline() {
  const [weeks, setWeeks] = React.useState([
    {
      week: 1,
      title: "Project Setup and Requirements Finalization",
      tasks: [
        { title: "Set up Next.js project structure", assignee: "Frontend (Dav)", completed: true },
        { title: "Connect with Figma design", assignee: "Frontend (Dav)", completed: true },
        { title: "Outline initial components", assignee: "Frontend (Dav)", completed: true },
        { title: "Set up Laravel environment", assignee: "Backend (Moh)", completed: true },
        { title: "Define database schema", assignee: "Backend (Moh)", completed: true },
        { title: "Finalize core requirements", assignee: "Both", completed: true },
        { title: "Document main user flows", assignee: "Both", completed: true },
      ]
    },
    {
      week: 2,
      title: "Basic Authentication & Authorization",
      tasks: [
        { title: "Create login and signup pages", assignee: "Frontend", completed: true },
        { title: "Set up basic routing", assignee: "Frontend", completed: true },
        { title: "Develop user roles (student, teacher)", assignee: "Backend", completed: true },
        { title: "Implement session-based authentication", assignee: "Backend", completed: true },
        { title: "Set up authentication routes", assignee: "Backend", completed: true },
        { title: "Test authentication across environments", assignee: "Both", completed: true },
      ]
    },
    {
      week: 3,
      title: "Deployment & Basic Dashboard",
      tasks: [
        { title: "Deploy to development/staging server", assignee: "Both", completed: true },
        { title: "Set up environment variables and databases", assignee: "Both", completed: true },
        { title: "Start basic dashboard structure", assignee: "Frontend", completed: true },
        { title: "Build initial API endpoints for dashboard", assignee: "Backend", completed: true },
        { title: "Test live environment setup", assignee: "Both", completed: true },
      ]
    },
    {
      week: 4,
      title: "Frontend Components & Backend Setup",
      tasks: [
        { title: "Build core components (dashboard, navigation)", assignee: "Frontend", completed: false },
        { title: "Develop initial models and endpoints", assignee: "Backend", completed: false },
        { title: "Integrate components with backend data", assignee: "Both", completed: false },
        { title: "Test in live environment", assignee: "Both", completed: false },
      ]
    },
    {
      week: 5,
      title: "Student Environment & API Endpoints",
      tasks: [
        { title: "Build student environment pages", assignee: "Frontend", completed: false },
        { title: "Develop student-specific endpoints", assignee: "Backend", completed: false },
        { title: "Test student environment and APIs", assignee: "Both", completed: false },
      ]
    },
    {
      week: 6,
      title: "Teacher Environment Setup",
      tasks: [
        { title: "Set up teacher environment core pages", assignee: "Frontend", completed: false },
        { title: "Develop teacher-specific endpoints", assignee: "Backend", completed: false },
        { title: "Test basic teacher setup", assignee: "Both", completed: false },
      ]
    },
    {
      week: 7,
      title: "Teacher Environment Finishing Touches",
      tasks: [
        { title: "Complete teacher environment components", assignee: "Frontend", completed: false },
        { title: "Finalize teacher-related endpoints", assignee: "Backend", completed: false },
        { title: "Test teacher environment fully", assignee: "Both", completed: false },
      ]
    },
    {
      week: 8,
      title: "Admin Setup",
      tasks: [
        { title: "Create admin interface", assignee: "Frontend", completed: false },
        { title: "Build admin-specific APIs", assignee: "Backend", completed: false },
        { title: "Test admin setup and role-based access", assignee: "Both", completed: false },
      ]
    },
    {
      week: 9,
      title: "Testing & Bug Fixes",
      tasks: [
        { title: "Conduct full system testing", assignee: "Both", completed: false },
        { title: "Perform integration and end-to-end testing", assignee: "Both", completed: false },
        { title: "Resolve identified issues", assignee: "Both", completed: false },
      ]
    },
    {
      week: 10,
      title: "Final Presentation & Project Wrap-Up",
      tasks: [
        { title: "Finalize deployment to production", assignee: "Both", completed: false },
        { title: "Prepare for final presentation", assignee: "Both", completed: false },
        { title: "Conduct final project review", assignee: "Both", completed: false },
        { title: "Gather feedback and make adjustments", assignee: "Both", completed: false },
      ]
    },
  ])
  let bit = true
  const toggleTaskCompletion = (weekIndex: number, taskIndex: number) => {

    setWeeks(prevWeeks => {
      const newWeeks = [...prevWeeks]
      newWeeks[weekIndex].tasks[taskIndex].completed = bit ? !newWeeks[weekIndex].tasks[taskIndex].completed : newWeeks[weekIndex].tasks[taskIndex].completed
      bit = !bit
      return newWeeks
    })
  }

  const calculateWeekProgress = (tasks: { completed: boolean }[]) => {
    const completedTasks = tasks.filter(task => task.completed).length
    return (completedTasks / tasks.length) * 100
  }

  return (
    <div className="container mx-auto p-4 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">10-Week Project Timeline</h1>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        <Accordion type="single" collapsible className="w-full">
          {weeks.map((week, weekIndex) => (
            <AccordionItem key={week.week} value={`week-${week.week}`}>
              <AccordionTrigger className="text-xl font-semibold">
                <div className="flex items-center justify-between w-full">
                  <span>Week {week.week}: {week.title}</span>
                  <Progress value={calculateWeekProgress(week.tasks)} className="w-[100px]" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {week.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(weekIndex, taskIndex)}  
                        />
                        <span className={task.completed ? "line-through" : ""}>{task.title}</span>
                      </div>
                      <Badge variant={task.assignee === 'Both' ? 'default' : task.assignee.includes('Frontend') ? 'secondary' : 'outline'}>
                        {task.assignee}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}