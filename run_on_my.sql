-- initialization
SET LINESIZE 200;

DROP TABLE ScoreRecord;

DROP TABLE Student;

DROP TABLE Course;

-- table creation
CREATE TABLE Student (
	StudentID integer PRIMARY KEY,
	Name varchar(9),
	Department varchar(23),
	DegreeOfCourse varchar(14),
	Advisor varchar(6));
		
CREATE TABLE Course (
	CourseID varchar(10) PRIMARY KEY,
	Name varchar(30),
	Instructor varchar(15),
	Credit integer);
		
CREATE TABLE ScoreRecord (
	StudentID integer REFERENCES Student(StudentID) ON DELETE CASCADE,
	CourseID varchar(10) REFERENCES Course(CourseID) ON DELETE CASCADE,
	Score double);

-- tuple insertion	
-- Student tuples
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse, Advisor) VALUES(70547, 'Rachel', 'Computer Science', 'Undergraduate', NULL);
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse, Advisor) VALUES(71041, 'Andrew', 'Physics', 'Graduate','Smith');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse) VALUES(80122, 'Brian', 'Computer Science', 'Undergraduate');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse) VALUES(80221, 'Victoria', 'Electrical Engineering', 'Undergraduate');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse) VALUES(80412, 'Dave', 'Computer Science', 'Undergraduate');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse, Advisor) VALUES(81111, 'Stella', 'Computer Science', 'Graduate','Jane');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse) VALUES(90574, 'Monica', 'Electrical Engineering', 'Undergraduate');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse) VALUES(90610, 'Jack', 'Computer Science', 'Undergraduate');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse) VALUES(90714, 'Brian', 'Computer Science', 'Undergraduate');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse) VALUES(90811, 'Monica', 'Mathematics', 'Undergraduate');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse) VALUES(90912, 'Diana', 'Computer Science', 'Undergraduate');
INSERT INTO Student(StudentID, Name, Department, DegreeOfCourse, Advisor) VALUES(91124, 'John', 'Computer Science', 'Graduate','Mike');


-- Course tuples
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS101', 'Introduction to Programming', 'Paul', 3);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS202', 'Problem Solving', 'Jane', 3);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS204', 'Descrete Mathematics', 'Dave', 3);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS206', 'Data Structure', 'Mike', 3);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS230', 'System Programming', 'Tom', 3);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS300', 'Introduction to Algorithms', 'Jane', 3);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS310', 'Embedded Computer Systems', 'Mike', 4);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS311', 'Computer Organization', 'Stella', 3);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS322', 'Formal Languages and Automata', 'Jane', 3);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS330', 'Operating Systems', 'Paul', 4);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS360', 'Introduction to Database', 'Mike', 3);
INSERT INTO Course(CourseID, Name, Instructor, Credit) VALUES('CS408', 'Computer Science Project', 'Tom', 3);

#ScoreRecord tuples
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(70547, 'CS204', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(70547, 'CS310', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(70547, 'CS408', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(71041, 'CS204', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(71041, 'CS330', 4.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(71041, 'CS360', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80122, 'CS202', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80122, 'CS204', 4.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80122, 'CS300', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80122, 'CS310', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80122, 'CS360', 4.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80122, 'CS408', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80221, 'CS101', 2.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80221, 'CS202', 2.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80221, 'CS206', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80221, 'CS230', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80221, 'CS330', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80412, 'CS202', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80412, 'CS206', 2.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80412, 'CS300', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(80412, 'CS360', 4.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(81111, 'CS360', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(81111, 'CS408', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90574, 'CS101', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90574, 'CS202', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90574, 'CS206', 4.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90574, 'CS230', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90574, 'CS300', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90574, 'CS310', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90574, 'CS330', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90610, 'CS101', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90610, 'CS202', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90610, 'CS206', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90610, 'CS230', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90714, 'CS101', 4.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90714, 'CS202', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90714, 'CS230', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90714, 'CS330', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90811, 'CS101', 4.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90811, 'CS202', 4.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90811, 'CS206', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90912, 'CS101', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90912, 'CS202', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90912, 'CS206', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90912, 'CS310', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(90912, 'CS330', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(91124, 'CS310', 3.3);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(91124, 'CS330', 3.7);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(91124, 'CS360', 4.0);
INSERT INTO ScoreRecord(StudentID, CourseID, Score) VALUES(91124, 'CS408', 3.7);
