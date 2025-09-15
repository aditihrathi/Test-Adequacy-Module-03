import { StudentID, StudentName, CourseID, Grade, Transcript } from "./Types";
import { ITranscriptService } from "./transcriptService.interface";
export default class TranscriptService implements ITranscriptService {
    /** the list of transcripts in the database */
    private transcripts;
    /** the last assigned student ID
     * @note Assumes studentID is Number
    */
    private lastID;
    private nextID;
    constructor();
    /** Initializes the database with an array of transcripts
     * @param {Transcript[]} initialTranscripts - the initial transcripts to populate the database
     */
    initialize(initialTranscripts: Transcript[]): void;
    /** Adds a new student to the database
     * @param {string} newName - the name of the student
     * @returns {StudentID} - the newly-assigned ID for the new student
     */
    addStudent(newName: string): StudentID;
    /**
     * @param studentName
     * @returns list of studentIDs associated with that name
     */
    getStudentIDsByName(studentName: string): StudentID[];
    getIndex(studentID: StudentID, name: StudentName): number;
    getTranscript(studentID: StudentID, name: StudentName): Transcript;
    /** Deletes a student from the database
     * @param {StudentID} studentID - the ID of the student to delete
     * @param {StudentName} name - the name of the student to delete
     * @throws {Error} if the transcript is not found for deletion
     */
    deleteStudent(studentID: StudentID, name: StudentName): void;
    getGrade(studentID: StudentID, studentName: StudentName, courseID: CourseID): Grade;
    addGrade(studentID: StudentID, studentName: StudentName, courseID: CourseID, grade: Grade): void;
    getAll(): Transcript[];
    getGPA(studentID: StudentID, studentName: StudentName): number;
    isEnrolled(studentID: StudentID, studentName: StudentName, courseID: CourseID): boolean;
}
