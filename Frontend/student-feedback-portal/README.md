**StudentFeedbackPortal** is a full-stack web application designed to facilitate structured and anonymous feedback between students and faculty in educational institutions. It allows students to submit course feedback while enabling faculty/admins to analyze that data to improve academic quality.

---

## Features

- Role-based login (Student / Admin / Faculty)
- Submit feedback for courses
- View course-wise feedback analytics (Admin/Faculty)
- List and manage courses
- JWT-based Authentication
- Fully responsive frontend (Reactjs + Tailwind CSS)
- Built with ASP.NET Core Web API and SQL Server backend

---

## Tech Stack

### Frontend:

- React.js
- Tailwind CSS 
- Axios
- React Router DOM

### Backend:

- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQL Server
- JWT Authentication

---

## Installation

### 🔧 Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/FeedbackPortal.git
   cd FeedbackPortal/backend

   ```

2. Configure the connection string in appsettings.json:

"ConnectionStrings": {
"DefaultConnection": "Server=;Database=StudentFeedbackDb;Trusted_Connection=True;TrustServerCertificate=True;"
}

3. Run migrations:

dotnet ef database update

4. Start the API:

dotnet run

5. Frontend Setup
   Open a new terminal:

cd FeedbackPortal/frontend
npm install

6. Start the frontend:

npm Start
