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

1. Install .net Core
2. Change directory into "Carpark API"
3. Run the solution file with your dotnet CLI
   `dotnet sln "Carpark API"`

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

# File Structure

TBC
