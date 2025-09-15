
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

    /* MUTATIONS:
- UpdateOperator 17:42- non-innocuous because it would lead to non-unique student IDs
- ConditionalExpression 59:84 - non-innocuous because it drops the studentName check, so could match wrong student if students share an ID
- ConditionalExpression 59:55 - non-innocuous because it drops the studentID check, so could match wrong student if students share an name
- LogicalOperator 59:55- non-innocuous OR allows for only a name match, so could match to wrong transcript if there are student's with other names.
- StringLiteral 61:29  - innocuous because it only changes the error message text, not the logic
- MethodExpression 120:16  - non-innocuous because it changes `.some` to `.every`, so a student with multiple courses would incorrectly not be “enrolled”.
- ConditionalExpression 120:45  - non-innocuous because changes the check to always `true`, so any student with at least one course looks enrolled in every course.
- Array Declaration 9:41  - innocous because it is a brittle test and you would have to write out the exact statement in order to.


 */
    // updateOperator test

    it("should assign strictly increasing student IDs (updateOperator mutation)", () => {
      const id1 = db.addStudent("Alice");
      const id2 = db.addStudent("Bob");
      expect(id2).toBeGreaterThan(id1);
    });
  });

  
    it("should throw error if studentID and studentName do not match exactly", () => {
      const idAlice = db.addStudent("Alice");
      const idBob = db.addStudent("Bob");
  
    
      expect(() => db.getTranscript(idBob, "Alice")).toThrow(
        "Transcript not found for the given ID and name"
      );
  
   
      expect(() => db.getTranscript(idAlice, "Bob")).toThrow(
        "Transcript not found for the given ID and name"
      );
  
      expect(() => db.getTranscript(idAlice, "Alice")).not.toThrow();
    
    });
  
    it("should return true if the student is enrolled in at least one course", () => {
      const studentName = "Alice";
      const studentID = db.addStudent(studentName);
  
      
      db.addGrade(studentID, studentName, "math", 100);
      db.addGrade(studentID, studentName, "history", 90);
  

      expect(db.isEnrolled(studentID, studentName, "math")).toBe(true);
      expect(db.isEnrolled(studentID, studentName, "history")).toBe(true);
     
      expect(db.isEnrolled(studentID, studentName, "science")).toBe(false);
    });

  




