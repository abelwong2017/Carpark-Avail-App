<div align="center">
  <h1>
      <img src="../Public/backend.svg" width="200"> 
      <br>
          Carpark Availability Backend
      <br>
  </h1>
</div>

<div align="center">
  <p>
    <a href="#installation-guide">Installation Guide</a> •
      <a href="#configuration">Configuration</a>  •
      <a href="#file-structure">File Structure</a>  
  </p>
</div>

# Installation Guide

1. Create an SQL database
2. Load the database with InitDB.sql
3. Install .net Core 3.1.404 SDK
4. See <a href="#configuration">Configuration</a> 
5. Change directory into '.\Carpark API\Carpark API\'
6. Build the solution file with your dotnet CLI
   `dotnet build"`
7. Run the solution `dotnet run`


# Configuration

1. In the directory Carpark API => appsettings.json , set your secret, frontend end point and backend endpoint as follow:

```
 {
    "JWT": {
        "Secret": "JWT Secret Here",
        "ValidAudience": "Front End Endpoint",
        "ValidIssuer": "Back End Endpoint"
    },
 }
```

\*\* You can get your backend endpoint by running the solution and seeing what the endpoint returns

2. Edit your MySQL connection string with your database details
   E.g. `"DefaultConnection": "server=localhost;port=3306;database=carparkDB;user=root;password=carpark"`

3. CORS: If your frontend URL is not "localhost:3000", then edit the file in `Carpark API/Carpark API/Startup.cs` line 39 to the frontend url link


