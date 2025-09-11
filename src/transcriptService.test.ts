import TranscriptService from "./transcriptService";

const db = new TranscriptService();

/*
Tests for the Transcript Service. 
 */
describe('TranscriptService', () => {

  beforeEach(() => {
    // Before any test runs, clean up the datastore. This should ensure that tests are hermetic.
    db.initialize([]);
  })

  describe('Create student', () => {
    it('should return an ID, starting with 1', () => {
      const ret = db.addStudent('avery');
      expect(ret).toBeDefined();
      // expect(ret).toEqual(1); // This is brittle! Initial ID should not be hardcoded.
    });
  })
  describe('Adding grades', () => {
    it('should add the grade to the transcript', () => {
      const studentName = 'test student';
      const courseID = 'test course';
      const studentID = db.addStudent(studentName);
      const grade = 100;
      db.addGrade(studentID, studentName, courseID, grade);
      const retrievedGrade = db.getGrade(studentID, studentName, courseID);
      expect(retrievedGrade).toBe(grade);
    })

    it('Should throw an error if the student ID is invalid', () => {
      const studentName = 'test student';
      const courseID = 'test course';
      const studentID = 1; // Assuming 1 is an invalid ID for this test
      const grade = 100;
      expect(() => db.addGrade(studentID, studentName, courseID, grade)).toThrow();      
    });
  })


  describe('getStudentIDsByName', () => {
    it('Should return only the students who match the name', () => {
      const avery1 = db.addStudent('avery');
      const avery2 = db.addStudent('avery');
      const ripley = db.addStudent('ripley');

      //Probably should be checking if arrays contain same set of IDs, permitting different orders...
      expect(db.getStudentIDsByName('avery')).toEqual([avery1, avery2]);
      expect(db.getStudentIDsByName('ripley')).toEqual([ripley]);
    })
  });
  describe('Deleting students', () => {
    it('Should result in the students\' transcript no longer being available', () => {
      const studentName = 'test student';
      const studentID = db.addStudent(studentName);
      db.deleteStudent(studentID, studentName);
      expect(() => db.getTranscript(studentID, studentName)).toThrow();
      // expect(db.getStudentIDsByName(studentName)).toEqual([]);
    });

    it('Should throw an error if the ID is invalid', ()=> {
      expect(()=>db.deleteStudent(10, 'test student')).toThrow();
    })
  })

  describe('getAll', () => {
    it('Should return the transcripts', () => {
      expect(db.getAll()).toEqual([]);
    });
  });

  describe("getGPA", () => {
    it("should compute GPA correctly for multiple courses", () => {
      const name = "student1";
      const id = db.addStudent(name);
      db.addGrade(id, name, "math", 100); // 4.0
      db.addGrade(id, name, "science", 75); // 3.0
      const gpa = db.getGPA(id, name);
      expect(gpa).toBeCloseTo(3.5, 1);
    });
  });

  describe("isEnrolled", () => {
    it("should return true if the student is enrolled in the course", () => {
      const name = "student3";
      const id = db.addStudent(name);
      db.addGrade(id, name, "history", 85);
      expect(db.isEnrolled(id, name, "history")).toBe(true);
    });
  });
});
