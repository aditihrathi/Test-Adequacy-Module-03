
import TranscriptService from "./transcriptService";

const db = new TranscriptService();

/*
new tests for lines 91 and 110
 */

  describe("getGrade error handling", () => {
    it("should throw an error if the course is not found (covers line 91)", () => {
      const studentName = "Alice";
      const studentId = db.addStudent(studentName);
      db.addGrade(studentId, studentName, "CS4530", 95);
      expect(() =>
        db.getGrade(studentId, studentName, "CS4100")
      ).toThrow(
        `Course with ID CS4100 not found for student Alice (ID: ${studentId})`
      );
    });
  });


  describe('getGPA error handling' , () => {
    it('should throw an error if student has no courses (covers line 110)', () => {
      const studentName = 'Steve';
      const studentID = db.addStudent(studentName);

      expect(() => db.getGPA(studentID, studentName)).toThrow(
        "No courses found for GPA calculation"
      );
    });
  });



