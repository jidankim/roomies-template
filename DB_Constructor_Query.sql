create database if not exists ROOMIE;
use ROOMIE;

drop table if exists COMMENTS;
drop table if exists STUDENT;
drop table if exists ROOM;
drop table if exists PREFERENCE;
drop table if exists DORMITORY;

create table if not exists PREFERENCE (
	Student_ID int,
    Smokes bool default false,
    Sleep_Start_Time time,
    Sleep_End_Time time,
    Music_Preference varchar(255),
    Hobby varchar(255),
    
    primary key (Student_ID)
);

create table if not exists DORMITORY (
	Dorm_ID varchar(255),
    Dorm_Name varchar(255),
    Location varchar(255),
    Fee int,
    Total_Capacity int,
    
    primary key (Dorm_ID)
);

create table if not exists ROOM (
	Room_ID varchar(255),
    Dorm_ID varchar(255),
    Floor int,
    Capacity int,
    
    primary key (Room_ID),
    foreign key (Dorm_ID) references DORMITORY(Dorm_ID)
);

create table if not exists STUDENT (
	Student_ID int,
    Password varchar(255) not null,
    First_Name varchar(255) not null,
    Last_Name varchar(255) not null,
    Age int,
    Major varchar(255),
    Club varchar(255),
    Phone_Number varchar(255),
    Room_ID varchar(255),
    
    primary key (Student_ID),
    foreign key (Room_ID) references ROOM(Room_ID)
);

create table if not exists COMMENTS (
	Comment_ID int not null auto_increment,
    Student_ID int,
    Room_ID varchar(255),
    Content text,
    
    primary key (Comment_ID),
    foreign key (Student_ID) references STUDENT(Student_ID),
    foreign key (Room_ID) references ROOM(Room_ID)
);

-- Inserting dummy data for DORMITORY
insert into DORMITORY (Dorm_ID, Dorm_Name, Location, Fee, Total_Capacity) values 
	("N20", "성실관", "North", 420000, 400)
    ;

-- Inserting dummy data for ROOM
insert into ROOM (Room_ID, Dorm_ID, Floor, Capacity) values
	("N20_228", "N20", 2, 2)
    ;

-- Inserting dummy data for STUDENT
insert into STUDENT (Student_ID, Password, First_Name, Last_Name, Age, Major, Club, Phone_Number, Room_ID) values 
	(20130736, "password", "Andrew", "Kim", 24, "Computer Science", "PASSION", "000-1234-5678", "N20_228")
    ;

-- Inserting dummy data for PREFERENCE
insert into PREFERENCE (Student_ID, Smokes, Sleep_Start_Time, Sleep_End_Time, Music_Preference, Hobby) values
	(20130736, False, "22:00:00", "06:00:00", "Orchestra", "Game")
    ;

-- Inserting dummy data for COMMENTS
insert into COMMENTS (Student_ID, Room_ID, Content) values 
	(20130736, "N20_228", "This room sucks man")
    ;

--create user if not exists 'test'@'localhost' identified by 'roommate';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON ROOMIE.* TO 'root'@'localhost';
flush privileges;
