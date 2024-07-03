#! /usr/bin/env node
import inquirer from 'inquirer';
// Student class representing each student
class Student {
    static idCounter = 0; // Static variable to generate unique IDs
    studentID; // Public variable for student ID
    name; // Public variable for student name
    courses = []; // Private variable to store courses
    balance = 0; // Private variable to store balance
    // Constructor to initialize student with a name
    constructor(name) {
        this.name = name;
        this.studentID = this.generateStudentID(); // Generate unique student ID
    }
    // Private method to generate a unique student ID
    generateStudentID() {
        Student.idCounter++;
        return String(Student.idCounter).padStart(5, '0');
    }
    // Public method to enroll student in a course
    enroll(course) {
        this.courses.push(course);
    }
    // Public method to view student's balance
    viewBalance() {
        return this.balance;
    }
    // Public method to pay tuition and reduce balance
    payTuition(amount) {
        this.balance -= amount;
    }
    // Public method to add to the student's balance
    addToBalance(amount) {
        this.balance += amount;
    }
    // Public method to show student's status
    showStatus() {
        console.log(`Student Name: ${this.name}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Courses Enrolled: ${this.courses.join(", ")}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// StudentManagementSystem class to manage multiple students
class StudentManagementSystem {
    listOfStudents = []; // List to store students
    // Method to add a new student
    async addStudent() {
        // Prompt user for student details
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the student name:',
            },
            {
                type: 'input',
                name: 'courses',
                message: 'Enter courses to enroll (comma separated):',
            },
            {
                type: 'input',
                name: 'initialBalance',
                message: 'Enter initial balance:',
                validate: input => !isNaN(parseFloat(input)) || 'Please enter a valid number',
            },
            {
                type: 'input',
                name: 'tuitionPayment',
                message: 'Enter tuition payment amount:',
                validate: input => !isNaN(parseFloat(input)) || 'Please enter a valid number',
            }
        ]);
        // Create a new student with the provided name
        const student = new Student(answers.name);
        // Enroll student in the provided courses
        const courses = answers.courses.split(',').map((course) => course.trim());
        courses.forEach((course) => student.enroll(course));
        // Set initial balance
        const initialBalance = parseFloat(answers.initialBalance);
        student.addToBalance(initialBalance);
        // Pay tuition
        const tuitionPayment = parseFloat(answers.tuitionPayment);
        student.payTuition(tuitionPayment);
        // Add the student to the list of students
        this.listOfStudents.push(student);
        // Show the student's status
        student.showStatus();
    }
    // Method to display the list of students
    displayStudentList() {
        this.listOfStudents.forEach(student => student.showStatus());
    }
}
// Main function to prompt user actions
(async function main() {
    const sms = new StudentManagementSystem();
    let condition = true;
    // Loop to continuously prompt user for actions until they choose to exit
    while (condition) {
        const action = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What do you want to do?',
            choices: ['Add Student', 'Display Student List', 'Exit']
        });
        // Handle user actions based on their choice
        switch (action.action) {
            case 'Add Student':
                await sms.addStudent();
                console.log("Student added successfully");
                break;
            case 'Display Student List':
                sms.displayStudentList();
                break;
            case 'Exit':
                condition = false; // Exit the loop
                break;
        }
    }
})();
