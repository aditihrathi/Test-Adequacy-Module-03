// the main interface for the database

import { StudentID, StudentName, Transcript, CourseID, Grade } from "./Types"

export interface ITranscriptService {

    initialize(arg0:Transcript[]): void; // Initializes the database with an array of transcripts
    getAll(): Transcript[]; // Returns all transcripts in the database
    
    addStudent(name: StudentName): StudentID;
    deleteStudent(studentID: StudentID, name: StudentName): void;

    getTranscript(studentID: StudentID, name:StudentName): Transcript;
    addGrade(studentID: StudentID, studentName: StudentName, courseID: CourseID, grade: Grade): void
    getGrade(studentID: StudentID, studentName: StudentName, courseID: CourseID): Grade
    
    getStudentIDsByName(name: StudentName): StudentID[]
}