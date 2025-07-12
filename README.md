***## StudentFeedbackPortal##**

***StudentFeedbackPortal** is a full-stack web application designed to facilitate structured and anonymous feedback between students and faculty in educational institutions. It allows students to submit course feedback while enabling faculty/admins to analyze that data to improve academic quality.

1. ## Features
- Role-based login (Student, Admin, Faculty)
- Students can submit feedback for courses
- Admins/Faculty can view course-wise feedback analytics
- Admins/Faculty can add, delete, and manage courses
- Fully responsive frontend built with React.js + Tailwind CSS
- JWT Authentication for login-based roles
- Secure API built with ASP.NET Core Web API and SQL Server

2. ## Tech Stack
   **Frontend:**
      - React.js
      - Tailwind CSS
      - Axios
      - React Router DOM

   **Backend:**
      - ASP.NET Core Web API (.NET 8), C#
      - Entity Framework Core
      - SQL Server
      - JWT Authentication for login-based roles

3. ## Installation
**Backend Setup**
   
   ***Clone the repository:**
    
    bash
      
      git clone https://github.com/vaibhavkdev/Student-Feedback-Portal.git
     
      cd Student-Feedback-Portal/backend

4. ***Configure the connection string in appsettings.json:**

    "ConnectionStrings":
      {

      "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=StudentFeedbackDb;Trusted_Connection=True;TrustServerCertificate=True;"

      }

6. **Run EF Core migrations:**

    dotnet ef database update

7. **Start the backend server:**

    dotnet run

**Frontend Setup**
1. ## Open a new terminal:

    cd Student-Feedback-Portal/frontend
  
    npm install

2. ## Start the frontend:

    npm start
