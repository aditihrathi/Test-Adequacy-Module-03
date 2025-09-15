import { StudentID, StudentName, Transcript, CourseID, Grade } from "./Types";
export interface ITranscriptService {
    initialize(arg0: Transcript[]): void;
    getAll(): Transcript[];
    addStudent(name: StudentName): StudentID;
    deleteStudent(studentID: StudentID, name: StudentName): void;
    getTranscript(studentID: StudentID, name: StudentName): Transcript;
    addGrade(studentID: StudentID, studentName: StudentName, courseID: CourseID, grade: Grade): void;
    getGrade(studentID: StudentID, studentName: StudentName, courseID: CourseID): Grade;
    getStudentIDsByName(name: StudentName): StudentID[];
}
