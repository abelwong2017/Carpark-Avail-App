using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Carpark_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Carpark_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private IConfiguration _config;
        private readonly UsersContext db;


        public SessionController(IConfiguration config, UsersContext db)
        {
            _config = config;
            this.db = db;
        }

        [HttpPost]
        public IActionResult Post(User loginDetails)
        {
            User login = new User();
            login.Email = loginDetails.Email;
            login.Password = loginDetails.Password;
            IActionResult response = Unauthorized();

            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenStr = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenStr });
            }

            return response;
        }

        private User AuthenticateUser(User login)
        {
            // Connect to database and check
            User user = null;
            
            var results = db.Users.FromSqlRaw("SELECT * FROM carparkDB.Users WHERE email = {0}", login.Email).FirstOrDefault();
            if(results != null && BCrypt.Net.BCrypt.Verify(login.Password + _config["Salt:Value"], results.Password))
            {
               
                user = new User
                {
                    Email = results.Email,
                    FirstName = results.FirstName,
                    LastName = results.LastName,
                    Password = results.Password
                };
                return user;
            }
            return null;
        }

        private string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.Email),
                new Claim(JwtRegisteredClaimNames.GivenName,userInfo.FirstName),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["JWT:ValidIssuer"],
                audience: _config["JWT:ValidAudience"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodeToken;
        }


    }
}
