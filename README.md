# Student Management System

This is a simple command-line application written in TypeScript that helps manage student information, including enrollment in courses, balance management, and displaying student status. The application utilizes the `inquirer` library for interactive user input.

## Prerequisites

- Node.js installed on your system.
- TypeScript installed globally (`npm install -g typescript`).

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
2. Install dependencies:
  ```bash
   npm install
```
3.Compile the TypeScript code:
```bash
 tsc
```

## Features

### Adding a Student

The application allows you to add a new student by providing their name, courses to enroll in, initial balance, and tuition payment amount. 

### Displaying the Student List

You can display the list of all students with their details, including their ID, name, enrolled courses, and balance.

### Exiting the Application

The application will continue to prompt for actions until you choose to exit.

## Code Overview

### Student Class

- **Attributes:**
  - `studentID`: A unique ID for each student.
  - `name`: The student's name.
  - `courses`: An array to store the courses the student is enrolled in.
  - `balance`: The student's balance.

- **Methods:**
  - `generateStudentID()`: Generates a unique ID for the student.
  - `enroll(course: string)`: Enrolls the student in a course.
  - `viewBalance()`: Returns the student's current balance.
  - `payTuition(amount: number)`: Reduces the student's balance by the given amount.
  - `addToBalance(amount: number)`: Adds the given amount to the student's balance.
  - `showStatus()`: Displays the student's current status.

### StudentManagementSystem Class

- **Attributes:**
  - `listOfStudents`: An array to store the list of students.

- **Methods:**
  - `addStudent()`: Prompts the user for student details and adds a new student.
  - `displayStudentList()`: Displays the list of all students and their details.

### Main Function

The main function initializes the `StudentManagementSystem` and prompts the user to choose actions like adding a student, displaying the student list, or exiting the application.

