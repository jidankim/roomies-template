*** ROOMIE *** - a web service for KAIST students to search room or roommates of their choice. 

How to Run the code in Windows: 
1. Install MySQL, and set root password to "roommate" - IMPORTANT!
2. Create Database "ROOMIE" in the MySQL
3. Run "ROOMIE DATABASE.sql" in the MySQL - This will set up the database for the service
4. Install Node.js
5. Use cmd to move to this directory
6. Type "npm install" and run the command
7. Run "npm install -g cross-env", "npm install -g nodemon" and "npm install -g babel-cli" to install plugins required to run the web server
8. Execute "npm run dev" to run the server
9. In any browser, type "localhost:4000" or "localhost:3000" to access the ROOMIE homepage