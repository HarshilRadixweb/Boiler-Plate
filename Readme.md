This is a very basic boilerplate for creating api structure for any new node project, using Mysql.
This plate comes with 3 in-built APIs, which you can customise or change any how.
It also includes JWT tokenizer with support of a single instance of user login at a time.
Other than this, we have provided an error handler, and database password encryption too.

Following are some steps/utils to use this plate.

1. Rename the root directory to your project name.
2. Edit ".env" file with your specific project details.
3. Run the following command to initalize the project and enter the details as you please: "npm init".
4. Run the following command to install all the required modules to get this project working:
   "npm i dotenv express express-mung cors http jsonwebtoken log4js md5 mongoose"

With this, you are ready to start working with your project.

To run the project, you need to use either, "nodemon" if you have installed it, or else "node index".
