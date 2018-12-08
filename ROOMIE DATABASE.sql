
DROP TABLE IF EXISTS commentary;
DROP TABLE IF EXISTS preference;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS dormitory;


CREATE TABLE dormitory (
    dorm_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    fee INT,
    capacity INT
);

CREATE TABLE room (
    room_id VARCHAR(10),
    dorm_id VARCHAR(10),
    floor INT,
    capacity INT,
    PRIMARY KEY(room_id),
    FOREIGN KEY(dorm_id) REFERENCES dormitory(dorm_id) ON DELETE CASCADE
);

CREATE TABLE student (
    student_id INT PRIMARY KEY,
    pw VARCHAR(20) NOT NULL,
    room_id VARCHAR(10),
    first_name VARCHAR(10) NOT NULL,
    last_name VARCHAR(10) NOT NULL,
    age INT,
    major VARCHAR(30) DEFAULT 'undecided',
    phonenumber VARCHAR(20),
    FOREIGN KEY(room_id) REFERENCES room(room_id) ON DELETE SET NULL
);

CREATE TABLE preference (
    student_id INT,
    smoker VARCHAR(1) DEFAULT 'N',
    sleep_start_time TIME,
    sleep_end_time TIME,
    music_Preference VARCHAR(20),
    hobby VARCHAR(20),
    club VARCHAR(20),
    PRIMARY KEY(student_id),
    FOREIGN KEY(student_id) REFERENCES student(student_id) ON DELETE CASCADE
);

CREATE TABLE commentary (
    comment_id INT AUTO_INCREMENT,
    student_id INT,
    room_id VARCHAR(10),
    date DATE,
    comment_txt VARCHAR(300),
    PRIMARY KEY(comment_id),
    FOREIGN KEY(student_id) REFERENCES student(student_id) ON DELETE SET NULL,
    FOREIGN KEY(room_id) REFERENCES room(room_id) ON DELETE CASCADE
);

CREATE TRIGGER room_capacity_insert BEFORE INSERT ON student
FOR EACH ROW
UPDATE room
SET capacity = capacity - 1
WHERE room_id = new.room_id;

CREATE TRIGGER room_capacity_update1 BEFORE UPDATE ON student
FOR EACH ROW
UPDATE room
SET capacity = capacity + 1
WHERE room_id = old.room_id;

CREATE TRIGGER room_capacity_update2 BEFORE UPDATE ON student
FOR EACH ROW
UPDATE room
SET capacity = capacity - 1
WHERE room_id = new.room_id;

CREATE TRIGGER room_capacity_delete BEFORE DELETE ON student
FOR EACH ROW
UPDATE room
SET capacity = capacity + 1
WHERE room_id = old.room_id;

CREATE TRIGGER dorm_capacity_delete BEFORE DELETE ON room
FOR EACH ROW
UPDATE dormitory
SET capacity = capacity - old.capacity
WHERE dorm_id = old.dorm_id;

CREATE TRIGGER dorm_capacity_insert BEFORE INSERT ON room
FOR EACH ROW
UPDATE dormitory
SET capacity = capacity + new.capacity
WHERE dorm_id = new.dorm_id;

CREATE TRIGGER dorm_capacity_update1 BEFORE UPDATE ON room
FOR EACH ROW
UPDATE dormitory
SET capacity = capacity - old.capacity
WHERE dorm_id = old.dorm_id;

CREATE TRIGGER dorm_capacity_update2 BEFORE UPDATE ON room
FOR EACH ROW
UPDATE dormitory
SET capacity = capacity + new.capacity
WHERE dorm_id = old.dorm_id;



INSERT INTO dormitory VALUES('N20', 'Shilloe', 400000, 0);
INSERT INTO dormitory VALUES('W4', 'HEEMANG', 600000, 0);
INSERT INTO room VALUES('N20_101', 'N20', 1, 2);
INSERT INTO room VALUES('N20_102', 'N20', 1, 2);
INSERT INTO room VALUES('N20_103', 'N20', 1, 2);
INSERT INTO room VALUES('N20_104', 'N20', 1, 2);
INSERT INTO room VALUES('N20_105', 'N20', 1, 2);
INSERT INTO room VALUES('N20_106', 'N20', 1, 2);
INSERT INTO room VALUES('N20_107', 'N20', 1, 2);
INSERT INTO room VALUES('N20_108', 'N20', 1, 2);
INSERT INTO room VALUES('N20_109', 'N20', 1, 2);
INSERT INTO room VALUES('N20_110', 'N20', 1, 2);
INSERT INTO room VALUES('N20_201', 'N20', 2, 2);
INSERT INTO room VALUES('N20_202', 'N20', 2, 2);
INSERT INTO room VALUES('N20_203', 'N20', 2, 2);
INSERT INTO room VALUES('N20_204', 'N20', 2, 2);
INSERT INTO room VALUES('N20_205', 'N20', 2, 2);
INSERT INTO room VALUES('N20_206', 'N20', 2, 2);
INSERT INTO room VALUES('N20_207', 'N20', 2, 2);
INSERT INTO room VALUES('N20_208', 'N20', 2, 2);
INSERT INTO room VALUES('N20_209', 'N20', 2, 2);
INSERT INTO room VALUES('N20_210', 'N20', 2, 2);
INSERT INTO room VALUES('N20_301', 'N20', 3, 2);
INSERT INTO room VALUES('N20_302', 'N20', 3, 2);
INSERT INTO room VALUES('N20_303', 'N20', 3, 2);
INSERT INTO room VALUES('N20_304', 'N20', 3, 2);
INSERT INTO room VALUES('N20_305', 'N20', 3, 2);
INSERT INTO room VALUES('N20_306', 'N20', 3, 2);
INSERT INTO room VALUES('N20_307', 'N20', 3, 2);
INSERT INTO room VALUES('N20_308', 'N20', 3, 2);
INSERT INTO room VALUES('N20_309', 'N20', 3, 2);
INSERT INTO room VALUES('N20_310', 'N20', 3, 2);
INSERT INTO room VALUES('N20_401', 'N20', 4, 2);
INSERT INTO room VALUES('N20_402', 'N20', 4, 2);
INSERT INTO room VALUES('N20_403', 'N20', 4, 2);
INSERT INTO room VALUES('N20_404', 'N20', 4, 2);
INSERT INTO room VALUES('N20_405', 'N20', 4, 2);
INSERT INTO room VALUES('N20_406', 'N20', 4, 2);
INSERT INTO room VALUES('N20_407', 'N20', 4, 2);
INSERT INTO room VALUES('N20_408', 'N20', 4, 2);
INSERT INTO room VALUES('N20_409', 'N20', 4, 2);
INSERT INTO room VALUES('N20_410', 'N20', 4, 2);
INSERT INTO room VALUES('N20_501', 'N20', 5, 2);
INSERT INTO room VALUES('N20_502', 'N20', 5, 2);
INSERT INTO room VALUES('N20_503', 'N20', 5, 2);
INSERT INTO room VALUES('N20_504', 'N20', 5, 2);
INSERT INTO room VALUES('N20_505', 'N20', 5, 2);
INSERT INTO room VALUES('N20_506', 'N20', 5, 2);
INSERT INTO room VALUES('N20_507', 'N20', 5, 2);
INSERT INTO room VALUES('N20_508', 'N20', 5, 2);
INSERT INTO room VALUES('N20_509', 'N20', 5, 2);
INSERT INTO room VALUES('N20_510', 'N20', 5, 2);
INSERT INTO room VALUES('W4_101', 'W4', 1, 2);
INSERT INTO room VALUES('W4_102', 'W4', 1, 2);
INSERT INTO room VALUES('W4_103', 'W4', 1, 2);
INSERT INTO room VALUES('W4_104', 'W4', 1, 2);
INSERT INTO room VALUES('W4_105', 'W4', 1, 2);
INSERT INTO room VALUES('W4_106', 'W4', 1, 2);
INSERT INTO room VALUES('W4_107', 'W4', 1, 2);
INSERT INTO room VALUES('W4_108', 'W4', 1, 2);
INSERT INTO room VALUES('W4_109', 'W4', 1, 2);
INSERT INTO room VALUES('W4_110', 'W4', 1, 2);
INSERT INTO room VALUES('W4_201', 'W4', 2, 2);
INSERT INTO room VALUES('W4_202', 'W4', 2, 2);
INSERT INTO room VALUES('W4_203', 'W4', 2, 2);
INSERT INTO room VALUES('W4_204', 'W4', 2, 2);
INSERT INTO room VALUES('W4_205', 'W4', 2, 2);
INSERT INTO room VALUES('W4_206', 'W4', 2, 2);
INSERT INTO room VALUES('W4_207', 'W4', 2, 2);
INSERT INTO room VALUES('W4_208', 'W4', 2, 2);
INSERT INTO room VALUES('W4_209', 'W4', 2, 2);
INSERT INTO room VALUES('W4_210', 'W4', 2, 2);
INSERT INTO room VALUES('W4_301', 'W4', 3, 2);
INSERT INTO room VALUES('W4_302', 'W4', 3, 2);
INSERT INTO room VALUES('W4_303', 'W4', 3, 2);
INSERT INTO room VALUES('W4_304', 'W4', 3, 2);
INSERT INTO room VALUES('W4_305', 'W4', 3, 2);
INSERT INTO room VALUES('W4_306', 'W4', 3, 2);
INSERT INTO room VALUES('W4_307', 'W4', 3, 2);
INSERT INTO room VALUES('W4_308', 'W4', 3, 2);
INSERT INTO room VALUES('W4_309', 'W4', 3, 2);
INSERT INTO room VALUES('W4_310', 'W4', 3, 2);
INSERT INTO room VALUES('W4_401', 'W4', 4, 2);
INSERT INTO room VALUES('W4_402', 'W4', 4, 2);
INSERT INTO room VALUES('W4_403', 'W4', 4, 2);
INSERT INTO room VALUES('W4_404', 'W4', 4, 2);
INSERT INTO room VALUES('W4_405', 'W4', 4, 2);
INSERT INTO room VALUES('W4_406', 'W4', 4, 2);
INSERT INTO room VALUES('W4_407', 'W4', 4, 2);
INSERT INTO room VALUES('W4_408', 'W4', 4, 2);
INSERT INTO room VALUES('W4_409', 'W4', 4, 2);
INSERT INTO room VALUES('W4_410', 'W4', 4, 2);
INSERT INTO room VALUES('W4_501', 'W4', 5, 2);
INSERT INTO room VALUES('W4_502', 'W4', 5, 2);
INSERT INTO room VALUES('W4_503', 'W4', 5, 2);
INSERT INTO room VALUES('W4_504', 'W4', 5, 2);
INSERT INTO room VALUES('W4_505', 'W4', 5, 2);
INSERT INTO room VALUES('W4_506', 'W4', 5, 2);
INSERT INTO room VALUES('W4_507', 'W4', 5, 2);
INSERT INTO room VALUES('W4_508', 'W4', 5, 2);
INSERT INTO room VALUES('W4_509', 'W4', 5, 2);
INSERT INTO room VALUES('W4_510', 'W4', 5, 2);
INSERT INTO room VALUES('W4_601', 'W4', 6, 2);
INSERT INTO room VALUES('W4_602', 'W4', 6, 2);
INSERT INTO room VALUES('W4_603', 'W4', 6, 2);
INSERT INTO room VALUES('W4_604', 'W4', 6, 2);
INSERT INTO room VALUES('W4_605', 'W4', 6, 2);
INSERT INTO room VALUES('W4_606', 'W4', 6, 2);
INSERT INTO room VALUES('W4_607', 'W4', 6, 2);
INSERT INTO room VALUES('W4_608', 'W4', 6, 2);
INSERT INTO room VALUES('W4_609', 'W4', 6, 2);
INSERT INTO room VALUES('W4_610', 'W4', 6, 2);
INSERT INTO room VALUES('W4_701', 'W4', 7, 2);
INSERT INTO room VALUES('W4_702', 'W4', 7, 2);
INSERT INTO room VALUES('W4_703', 'W4', 7, 2);
INSERT INTO room VALUES('W4_704', 'W4', 7, 2);
INSERT INTO room VALUES('W4_705', 'W4', 7, 2);
INSERT INTO room VALUES('W4_706', 'W4', 7, 2);
INSERT INTO room VALUES('W4_707', 'W4', 7, 2);
INSERT INTO room VALUES('W4_708', 'W4', 7, 2);
INSERT INTO room VALUES('W4_709', 'W4', 7, 2);
INSERT INTO room VALUES('W4_710', 'W4', 7, 2);
INSERT INTO room VALUES('W4_801', 'W4', 8, 2);
INSERT INTO room VALUES('W4_802', 'W4', 8, 2);
INSERT INTO room VALUES('W4_803', 'W4', 8, 2);
INSERT INTO room VALUES('W4_804', 'W4', 8, 2);
INSERT INTO room VALUES('W4_805', 'W4', 8, 2);
INSERT INTO room VALUES('W4_806', 'W4', 8, 2);
INSERT INTO room VALUES('W4_807', 'W4', 8, 2);
INSERT INTO room VALUES('W4_808', 'W4', 8, 2);
INSERT INTO room VALUES('W4_809', 'W4', 8, 2);
INSERT INTO room VALUES('W4_810', 'W4', 8, 2);
INSERT INTO student VALUES(20180001, 'password', 'N20_101','SEOHUN','KIM', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180001, 'Y', '23:00:00', '07:00:00', 'Pop', 'Movies', 'Muse');
INSERT INTO student VALUES(20180002, 'password', 'N20_102','JANGWAN','LEE', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180002, 'N', '24:00:00', '08:00:00', 'Jazz', 'Videogame', 'Haje');
INSERT INTO student VALUES(20180003, 'password', 'N20_103','JINHO','LEE', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180003, 'Y', '22:00:00', '06:00:00', 'EDM', 'Soccor', NULL);
INSERT INTO student VALUES(20180004, 'password', 'N20_104','JIMIN','HUH', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180004, 'N', '23:00:00', '07:00:00', 'Country', 'Dancing', 'Lunatic');
INSERT INTO student VALUES(20180005, 'password', 'N20_104','JUNSEONG','PARK', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180005, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20180006, 'password', 'N20_106','HWANHEE','LEE', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180006, 'Y', '23:00:00', '07:30:00', NULL, 'Boardgames', 'Puple');
INSERT INTO student VALUES(20180007, 'password', 'N20_109','EUNJIN','KIM', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180007, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20180008, 'password', 'N20_201','DAEYOON','JI', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180008, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20180009, 'password', 'N20_203','DONGHUN','PARK', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180009, 'N', '22:00:00', '06:30:00', 'Jazz', 'Reading', 'Baobab');
INSERT INTO student VALUES(20180010, 'password', 'N20_203','SUHAN','KIM', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180010, 'Y', '22:00:00', '06:00:00', 'Pop', 'Swimming', 'Gaori');
INSERT INTO student VALUES(20180011, 'password', 'N20_206','CHANHYUK','LEE', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180011, 'N', '24:00:00', '07:00:00', 'Kpop', 'Singing', 'Sixlines');
INSERT INTO student VALUES(20180012, 'password', 'N20_208','YEONHO','LEE', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180012, 'Y', '24:00:00', '08:00:00', 'EDM', 'Basketball', NULL);
INSERT INTO student VALUES(20180013, 'password', 'N20_209','DONGHOO','CHAE', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180013, 'N', '23:00:00', '07:00:00', 'Country', 'Tennis', 'Stroke');
INSERT INTO student VALUES(20180014, 'password', 'N20_301','HOON','LEE', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180014, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20180015, 'password', 'N20_301','HWANHEE','LEE', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180015, 'Y', '23:00:00', '07:30:00', NULL, 'Running', 'Chorus');
INSERT INTO student VALUES(20180016, 'password', 'N20_302','CHAEMIN','SEONG', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180016, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20180017, 'password', 'N20_303','TAEYOUNG','SHIN', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180017, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20180018, 'password', 'N20_306','TAEYEON','KIM', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180018, 'N', '23:00:00', '07:30:00', 'Jazz', 'DANCING', 'ILLUSION');
INSERT INTO student VALUES(20180019, 'password', 'N20_307','JAEYOUNG','KIM', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180019, 'Y', '23:00:00', '07:00:00', 'Pop', 'Movies', 'Muse');
INSERT INTO student VALUES(20180020, 'password', 'N20_307','JANGHUN','SEO', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180020, 'N', '24:00:00', '08:00:00', 'Jazz', 'Videogame', 'Haje');
INSERT INTO student VALUES(20180021, 'password', 'N20_309','MINSEO','SONG', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180021, 'Y', '22:00:00', '06:00:00', 'EDM', 'Soccor', NULL);
INSERT INTO student VALUES(20180022, 'password', 'N20_402','TAEHUN','SON', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180022, 'N', '23:00:00', '07:00:00', 'Country', 'Dancing', 'Lunatic');
INSERT INTO student VALUES(20180023, 'password', 'N20_403','JUHWAN','CHO', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180023, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20180024, 'password', 'N20_404','SIWAN','JOO', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180024, 'Y', '23:00:00', '07:30:00', NULL, 'Boardgames', 'Puple');
INSERT INTO student VALUES(20180025, 'password', 'N20_404','SIHOO','KIM', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180025, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20180026, 'password', 'N20_405','SEUNGJIN','JI', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180026, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20180027, 'password', 'N20_406','SUHYUK','PARK', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180027, 'N', '22:00:00', '06:30:00', 'Jazz', 'Reading', 'Baobab');
INSERT INTO student VALUES(20180028, 'password', 'N20_408','SEWON','WOO', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180028, 'Y', '22:00:00', '06:00:00', 'Pop', 'Swimming', 'Gaori');
INSERT INTO student VALUES(20180029, 'password', 'N20_501','YOUNGJUN','YOO', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180029, 'N', '24:00:00', '07:00:00', 'Kpop', 'Singing', 'Sixlines');
INSERT INTO student VALUES(20180030, 'password', 'N20_501','DONGHAE','KIM', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180030, 'Y', '24:00:00', '08:00:00', 'EDM', 'Basketball', NULL);
INSERT INTO student VALUES(20180031, 'password', 'N20_503','TAEHWAN','CHAE', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180031, 'N', '23:00:00', '07:00:00', 'Country', 'Tennis', 'Stroke');
INSERT INTO student VALUES(20180032, 'password', 'N20_504','SEUNGIL','KIM', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180032, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20180033, 'password', 'N20_505','HANEUL','LEE', 19, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180033, 'Y', '23:00:00', '07:30:00', NULL, 'Running', 'Chorus');
INSERT INTO student VALUES(20180034, 'password', 'N20_508','JOOCHAN','SEONG', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180034, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20180035, 'password', 'N20_508','EUNCHAN','SHIN', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180035, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20180036, 'password', 'N20_510','HYOSEONG','KIM', 20, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20180036, 'N', '23:00:00', '07:30:00', 'Jazz', 'DANCING', 'ILLUSION');
INSERT INTO student VALUES(20170001, 'password', 'W4_101','YOONTAE','KIM', 21, 'Biology', "010-1234-5678");
INSERT INTO preference VALUES(20170001, 'Y', '23:00:00', '07:00:00', 'Pop', 'Movies', 'Muse');
INSERT INTO student VALUES(20170002, 'password', 'W4_102','DONGWON','LEE', 21, 'Chemistry', "010-1234-5678");
INSERT INTO preference VALUES(20170002, 'N', '24:00:00', '08:00:00', 'Jazz', 'Videogame', 'Haje');
INSERT INTO student VALUES(20170003, 'password', 'W4_103','TAEEUN','LEE', 20, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170003, 'Y', '22:00:00', '06:00:00', 'EDM', 'Soccor', NULL);
INSERT INTO student VALUES(20170004, 'password', 'W4_104','JUNIL','HUH', 21, 'Mechanical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170004, 'N', '23:00:00', '07:00:00', 'Country', 'Dancing', 'Lunatic');
INSERT INTO student VALUES(20170005, 'password', 'W4_104','INTAE','PARK', 20, 'Industrial Design', "010-1234-5678");
INSERT INTO preference VALUES(20170005, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20170006, 'password', 'W4_106','HANJUN','LEE', 20, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170006, 'Y', '23:00:00', '07:30:00', NULL, 'Boardgames', 'Puple');
INSERT INTO student VALUES(20170007, 'password', 'W4_109','JIBIN','KIM', 21, 'Physics', "010-1234-5678");
INSERT INTO preference VALUES(20170007, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20170008, 'password', 'W4_201','CHANHO','JI', 21, 'Mathematics', "010-1234-5678");
INSERT INTO preference VALUES(20170008, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20170009, 'password', 'W4_203','SEONWOO','PARK', 21, 'Industrial Design', "010-1234-5678");
INSERT INTO preference VALUES(20170009, 'N', '22:00:00', '06:30:00', 'Jazz', 'Reading', 'Baobab');
INSERT INTO student VALUES(20170010, 'password', 'W4_203','SEUNGWAN','KIM', 21, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170010, 'Y', '22:00:00', '06:00:00', 'Pop', 'Swimming', 'Gaori');
INSERT INTO student VALUES(20170011, 'password', 'W4_206','SIYOON','LEE', 21, 'Biology', "010-1234-5678");
INSERT INTO preference VALUES(20170011, 'N', '24:00:00', '07:00:00', 'Kpop', 'Singing', 'Sixlines');
INSERT INTO student VALUES(20170012, 'password', 'W4_208','HEESEONG','LEE', 20, 'Chemistry', "010-1234-5678");
INSERT INTO preference VALUES(20170012, 'Y', '24:00:00', '08:00:00', 'EDM', 'Basketball', NULL);
INSERT INTO student VALUES(20170013, 'password', 'W4_209','WONJUN','CHAE', 21, 'Biochemical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170013, 'N', '23:00:00', '07:00:00', 'Country', 'Tennis', 'Stroke');
INSERT INTO student VALUES(20170014, 'password', 'W4_301','HAN','LEE', 20, 'Mechanical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170014, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20170015, 'password', 'W4_301','CHAN','LEE', 20, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170015, 'Y', '23:00:00', '07:30:00', NULL, 'Running', 'Chorus');
INSERT INTO student VALUES(20170016, 'password', 'W4_302','DAEYOUNG','SEONG', 21, 'Chemistry', "010-1234-5678");
INSERT INTO preference VALUES(20170016, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20170017, 'password', 'W4_303','EUNCHAN','SHIN', 21, 'Electronical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170017, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20170018, 'password', 'W4_306','JIWOONG','KIM', 21, 'Economics', "010-1234-5678");
INSERT INTO preference VALUES(20170018, 'N', '23:00:00', '07:30:00', 'Jazz', 'DANCING', 'ILLUSION');
INSERT INTO student VALUES(20170019, 'password', 'W4_307','JIHOON','KIM', 21, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170019, 'Y', '23:00:00', '07:00:00', 'Pop', 'Movies', 'Muse');
INSERT INTO student VALUES(20170020, 'password', 'W4_307','ISU','SEO', 21, 'Electronical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170020, 'N', '24:00:00', '08:00:00', 'Jazz', 'Videogame', 'Haje');
INSERT INTO student VALUES(20170021, 'password', 'W4_309','MINKI','SONG', 20, 'Industrial Design', "010-1234-5678");
INSERT INTO preference VALUES(20170021, 'Y', '22:00:00', '06:00:00', 'EDM', 'Soccor', NULL);
INSERT INTO student VALUES(20170022, 'password', 'W4_402','HOYOUNG','SON', 21, 'Mathematics', "010-1234-5678");
INSERT INTO preference VALUES(20170022, 'N', '23:00:00', '07:00:00', 'Country', 'Dancing', 'Lunatic');
INSERT INTO student VALUES(20170023, 'password', 'W4_403','YEONJAE','CHO', 20, 'Physics', "010-1234-5678");
INSERT INTO preference VALUES(20170023, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20170024, 'password', 'W4_404','YOONSANG','JOO', 20, 'Mechanical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170024, 'Y', '23:00:00', '07:30:00', NULL, 'Boardgames', 'Puple');
INSERT INTO student VALUES(20170025, 'password', 'W4_404','EUNKYO','KIM', 21, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170025, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20170026, 'password', 'W4_405','JAEMIN','JI', 21, 'undecided', "010-1234-5678");
INSERT INTO preference VALUES(20170026, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20170027, 'password', 'W4_406','YOONSEOP','PARK', 21, 'Economics', "010-1234-5678");
INSERT INTO preference VALUES(20170027, 'N', '22:00:00', '06:30:00', 'Jazz', 'Reading', 'Baobab');
INSERT INTO student VALUES(20170028, 'password', 'W4_408','DAHUN','WOO', 21, 'Electronical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170028, 'Y', '22:00:00', '06:00:00', 'Pop', 'Swimming', 'Gaori');
INSERT INTO student VALUES(20170029, 'password', 'W4_501','DAEYOUNG','YOO', 21, 'Physics', "010-1234-5678");
INSERT INTO preference VALUES(20170029, 'N', '24:00:00', '07:00:00', 'Kpop', 'Singing', 'Sixlines');
INSERT INTO student VALUES(20170030, 'password', 'W4_501','DOYOON','KIM', 20, 'Mathematics', "010-1234-5678");
INSERT INTO preference VALUES(20170030, 'Y', '24:00:00', '08:00:00', 'EDM', 'Basketball', NULL);
INSERT INTO student VALUES(20170031, 'password', 'W4_503','JIWAN','CHAE', 21, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170031, 'N', '23:00:00', '07:00:00', 'Country', 'Tennis', 'Stroke');
INSERT INTO student VALUES(20170032, 'password', 'W4_504','WONHOON','KIM', 20, 'Mechanical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170032, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20170033, 'password', 'W4_505','SONGBIN','LEE', 20, 'Biochemical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170033, 'Y', '23:00:00', '07:30:00', NULL, 'Running', 'Chorus');
INSERT INTO student VALUES(20170034, 'password', 'W4_508','SEUNGHOO','SEONG', 21, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170034, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20170035, 'password', 'W4_508','HYOCHAN','SHIN', 21, 'Chemistry', "010-1234-5678");
INSERT INTO preference VALUES(20170035, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20170036, 'password', 'W4_510','DOHUN','KIM', 21, 'Biology', "010-1234-5678");
INSERT INTO preference VALUES(20170036, 'N', '23:00:00', '07:30:00', 'Jazz', 'DANCING', 'ILLUSION');
INSERT INTO student VALUES(20170037, 'password', 'W4_601','SUHAN','KIM', 21, 'Biology', "010-1234-5678");
INSERT INTO preference VALUES(20170037, 'Y', '23:00:00', '07:00:00', 'Pop', 'Movies', 'Muse');
INSERT INTO student VALUES(20170038, 'password', 'W4_602','JAEYOUNG','LEE', 21, 'Chemistry', "010-1234-5678");
INSERT INTO preference VALUES(20170038, 'N', '24:00:00', '08:00:00', 'Jazz', 'Videogame', 'Haje');
INSERT INTO student VALUES(20170039, 'password', 'W4_603','JUNHYUK','LEE', 20, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170039, 'Y', '22:00:00', '06:00:00', 'EDM', 'Soccor', NULL);
INSERT INTO student VALUES(20170040, 'password', 'W4_604','CHANHO','HUH', 21, 'Mechanical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170040, 'N', '23:00:00', '07:00:00', 'Country', 'Dancing', 'Lunatic');
INSERT INTO student VALUES(20170041, 'password', 'W4_604','YOONHOO','PARK', 20, 'Industrial Design', "010-1234-5678");
INSERT INTO preference VALUES(20170041, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20170042, 'password', 'W4_606','WOOSEONG','LEE', 20, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170042, 'Y', '23:00:00', '07:30:00', NULL, 'Boardgames', 'Puple');
INSERT INTO student VALUES(20170043, 'password', 'W4_609','HYUNHO','KIM', 21, 'Physics', "010-1234-5678");
INSERT INTO preference VALUES(20170043, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20170044, 'password', 'W4_701','ICHAN','JI', 21, 'Mathematics', "010-1234-5678");
INSERT INTO preference VALUES(20170044, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20170045, 'password', 'W4_703','MINJUN','PARK', 21, 'Industrial Design', "010-1234-5678");
INSERT INTO preference VALUES(20170045, 'N', '22:00:00', '06:30:00', 'Jazz', 'Reading', 'Baobab');
INSERT INTO student VALUES(20170046, 'password', 'W4_703','YUNCHAE','KIM', 21, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170046, 'Y', '22:00:00', '06:00:00', 'Pop', 'Swimming', 'Gaori');
INSERT INTO student VALUES(20170047, 'password', 'W4_706','SIWOO','LEE', 21, 'Biology', "010-1234-5678");
INSERT INTO preference VALUES(20170047, 'N', '24:00:00', '07:00:00', 'Kpop', 'Singing', 'Sixlines');
INSERT INTO student VALUES(20170048, 'password', 'W4_708','DONGYOUNG','LEE', 20, 'Chemistry', "010-1234-5678");
INSERT INTO preference VALUES(20170048, 'Y', '24:00:00', '08:00:00', 'EDM', 'Basketball', NULL);
INSERT INTO student VALUES(20170049, 'password', 'W4_709','DONGYEON','CHAE', 21, 'Biochemical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170049, 'N', '23:00:00', '07:00:00', 'Country', 'Tennis', 'Stroke');
INSERT INTO student VALUES(20170050, 'password', 'W4_801','DONGHWAN','LEE', 20, 'Mechanical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170050, 'Y', '01:00:00', '09:00:00', 'Dubsteb', 'DJ', NULL);
INSERT INTO student VALUES(20170051, 'password', 'W4_801','HOJUN','LEE', 20, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170051, 'Y', '23:00:00', '07:30:00', NULL, 'Running', 'Chorus');
INSERT INTO student VALUES(20170052, 'password', 'W4_802','YOOJUN','SEONG', 21, 'Chemistry', "010-1234-5678");
INSERT INTO preference VALUES(20170052, 'N', '22:00:00', '06:00:00', 'Jazz', 'Exercise', 'Line');
INSERT INTO student VALUES(20170053, 'password', 'W4_803','TAEHWAN','SHIN', 21, 'Electronical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170053, 'Y', '24:00:00', '08:30:00', 'Pop', 'Videogame', NULL);
INSERT INTO student VALUES(20170054, 'password', 'W4_806','YOUNGIN','KIM', 21, 'Economics', "010-1234-5678");
INSERT INTO preference VALUES(20170054, 'N', '23:00:00', '07:30:00', 'Jazz', 'DANCING', 'ILLUSION');
INSERT INTO student VALUES(20170055, 'password', 'W4_807','YOOSANG','KIM', 21, 'Computer Science', "010-1234-5678");
INSERT INTO preference VALUES(20170055, 'Y', '23:00:00', '07:00:00', 'Pop', 'Movies', 'Muse');
INSERT INTO student VALUES(20170056, 'password', 'W4_807','JAEHYUK','SEO', 21, 'Electronical Engineering', "010-1234-5678");
INSERT INTO preference VALUES(20170056, 'N', '24:00:00', '08:00:00', 'Jazz', 'Videogame', 'Haje');
INSERT INTO student VALUES(20170057, 'password', 'W4_809','SEUNGWON','SONG', 20, 'Industrial Design', "010-1234-5678");
INSERT INTO preference VALUES(20170057, 'Y', '22:00:00', '06:00:00', 'EDM', 'Soccor', NULL);


INSERT INTO commentary VALUES(NULL, 20180032, 'N20_504', '2018-11-14', "It's too hard to get to my room.");
INSERT INTO commentary VALUES(NULL, 20170054, 'W4_306', '2018-10-23', "The room was pretty dirty");
INSERT INTO commentary VALUES(NULL, 20170012, 'W4_804', '2018-08-21', "My room was too far from the toilet and the shower");
INSERT INTO commentary VALUES(NULL, 20180008, 'N20_203', '2018-12-03', "I like the second floor. It is easy to go out and come back into my room everyday.");
INSERT INTO commentary VALUES(NULL, 20170040, 'W4_104', '2018-09-14', "I saw a cockroach!");
INSERT INTO commentary VALUES(NULL, 20180012, 'N20_102', '2018-06-30', "Smoke comes into my room when I open the window");


SELECT commentary.date, commentary.room_id, commentary.comment_txt, student.first_name, student.last_name
FROM commentary
JOIN student
ON commentary.student_id = student.student_id
ORDER BY commentary.date;