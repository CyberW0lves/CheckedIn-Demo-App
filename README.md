### Follow the below steps to run the application on your local machine

**/CLIENT**

- First install dependencies with below command

  - => npm install

- Create .env file at root and add API Url

  - => NEXT_PUBLIC_API_URL = "http://localhost:8080/api"

- Run the application in Dev mode

  - => npm start

- Application will be running on PORT 3000
  - => http://localhost:3000/

**/Server**

- First install dependencies with below command

  - => npm install

- Create .env file at root and below details

  - => DB = "Add MongoDb Cluster Url"
  - => CLIENT_URL = "http://localhost:3000"
  - => SALT = 10
  - => CLOUDINARY_NAME = "Cloudinary cloud name"
  - => CLOUDINARY_API_KEY = "Cloudinary API key"
  - => CLOUDINARY_API_SECRET = "Cloudinary API secret"
  - => SMTP_HOST = smtp.gmail.com
  - => SMTP_PORT = 465
  - => SMTP_SECURE = true
  - => SMTP_USER = "Your Email Id"
  - => SMTP_PASS = "Your Email Password"
  - => ACCESS_TOKEN_PRIVATE_KEY = "Set your own Password"
  - => REFRESH_TOKEN_PRIVATE_KEY = "Set your own Password"

- Run the application in Dev mode

  - => npm run dev

- Application will be running on PORT 8080
  - => http://localhost:8080/
