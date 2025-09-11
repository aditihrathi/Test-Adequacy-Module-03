// import { StudentID, StudentName, Transcript, CourseID } from "./Types"

export type StudentID = number; // Unique identifier for a student
export type StudentName = string; // Name of the student
export type CourseID = string; // Unique identifier for a course
export type Grade = number; // Grade for a course, typically between 0 and 100

 // Transcript containing student ID, student name, and their courses with grades
export type Transcript = {
    studentID: StudentID,
    studentName: StudentName,
    courses: { courseID: CourseID, grade: Grade }[]
};
    