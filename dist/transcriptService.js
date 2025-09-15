"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TranscriptService {
    nextID() { return this.lastID++; }
    constructor() {
        /** the list of transcripts in the database */
        this.transcripts = [];
        /** the last assigned student ID
         * @note Assumes studentID is Number
        */
        // changed from 0 to 1 to fix "should be a positive integer" test
        this.lastID = 1; // this should be private to nextID().
    }
    /** Initializes the database with an array of transcripts
     * @param {Transcript[]} initialTranscripts - the initial transcripts to populate the database
     */
    initialize(initialTranscripts) {
        this.transcripts = initialTranscripts;
    }
    /** Adds a new student to the database
     * @param {string} newName - the name of the student
     * @returns {StudentID} - the newly-assigned ID for the new student
     */
    addStudent(newName) {
        const newID = this.nextID();
        const newTranscript = {
            studentID: newID,
            studentName: newName,
            courses: [] // initially no courses
        };
        this.transcripts.push(newTranscript);
        return newID;
    }
    /**
     * @param studentName
     * @returns list of studentIDs associated with that name
     */
    getStudentIDsByName(studentName) {
        return this.transcripts
            .filter(t => t.studentName === studentName)
            .map(t => t.studentID);
    }
    // unnecessarily clever way to validate the existence of a transcript:
    // throws error if not found or doesn't match
    getIndex(studentID, name) {
        const index = this.transcripts.findIndex(t => t.studentID === studentID && t.studentName === name);
        if (index === -1) {
            throw new Error("Transcript not found for the given ID and name");
        }
        else {
            return index;
        }
    }
    getTranscript(studentID, name) {
        const index = this.getIndex(studentID, name);
        // throws error if not found or doesn't match
        return this.transcripts[index];
    }
    /** Deletes a student from the database
     * @param {StudentID} studentID - the ID of the student to delete
     * @param {StudentName} name - the name of the student to delete
     * @throws {Error} if the transcript is not found for deletion
     */
    deleteStudent(studentID, name) {
        const index = this.getIndex(studentID, name);
        // throws error if not found or doesn't match, so index is guaranteed to be valid
        this.transcripts.splice(index, 1); // remove the transcript from the array
    }
    getGrade(studentID, studentName, courseID) {
        const index = this.getIndex(studentID, studentName);
        const courses = this.transcripts[index].courses;
        const course = courses.find(c => c.courseID === courseID);
        if (!course) {
            throw new Error(`Course with ID ${courseID} not found for student ${studentName} (ID: ${studentID})`);
        }
        return course.grade; // return the grade for the course
    }
    addGrade(studentID, studentName, courseID, grade) {
        const index = this.getIndex(studentID, studentName);
        // throws error if not found or doesn't match, so index is guaranteed to be valid
        // would .concat({courseID, grade}) work here?
        const transcript = this.transcripts[index].courses.push({ courseID: courseID, grade: grade });
    }
    getAll() {
        return this.transcripts; // return the entire transcripts array
    }
    getGPA(studentID, studentName) {
        const transcript = this.getTranscript(studentID, studentName);
        if (transcript.courses.length === 0) {
            throw new Error("No courses found for GPA calculation");
        }
        const grades = transcript.courses.map(c => c.grade);
        const total = grades.reduce((acc, grade) => acc + grade, 0);
        const avg = total / grades.length;
        return avg / 25; // Convert to GPA scale
    }
    isEnrolled(studentID, studentName, courseID) {
        const transcript = this.getTranscript(studentID, studentName);
        return transcript.courses.some(c => c.courseID === courseID);
    }
}
exports.default = TranscriptService;
