#! /usr/bin/env node

import inquirer from 'inquirer';

// Student class representing each student
class Student {
    private static idCounter = 0; // Static variable to generate unique IDs
    public studentID: string; // Public variable for student ID
    public name: string; // Public variable for student name
    private courses: string[] = []; // Private variable to store courses
    private balance: number = 0; // Private variable to store balance

    // Constructor to initialize student with a name
    constructor(name: string) {
        this.name = name;
        this.studentID = this.generateStudentID(); // Generate unique student ID
    }

    // Private method to generate a unique student ID
    private generateStudentID(): string {
        Student.idCounter++;
        return String(Student.idCounter).padStart(5, '0');
    }

    // Public method to enroll student in a course
    public enroll(course: string): void {
        this.courses.push(course);
    }

    // Public method to view student's balance
    public viewBalance(): number {
        return this.balance;
    }

    // Public method to pay tuition and reduce balance
    public payTuition(amount: number): void {
        this.balance -= amount;
    }

    // Public method to add to the student's balance
    public addToBalance(amount: number): void {
        this.balance += amount;
    }

    // Public method to show student's status
    public showStatus(): void {
        console.log(`Student Name: ${this.name}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Courses Enrolled: ${this.courses.join(", ")}`);
        console.log(`Balance: ${this.balance}`);
    }
}

// StudentManagementSystem class to manage multiple students
class StudentManagementSystem {
    private listOfStudents: Student[] = []; // List to store students

    // Method to add a new student
    public async addStudent() {
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
        const courses: string[] = answers.courses.split(',').map((course: string) => course.trim());
        courses.forEach((course: string) => student.enroll(course));

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
    public displayStudentList(): void {
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
