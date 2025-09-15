export type StudentID = number;
export type StudentName = string;
export type CourseID = string;
export type Grade = number;
export type Transcript = {
    studentID: StudentID;
    studentName: StudentName;
    courses: {
        courseID: CourseID;
        grade: Grade;
    }[];
};
