using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using System.Globalization;
using Carpark_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Carpark_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly UsersContext db;
        private readonly IHttpClientFactory _clientFactory;


        public LoginController(IConfiguration config, UsersContext db, IHttpClientFactory clientFactory)
        {
            _config = config;
            this.db = db;
            _clientFactory = clientFactory;
        }

        [HttpGet]
        public IActionResult Login(string email, string pass)
        {

            User login = new User();
            login.Email = email;
            login.Password = pass;
            IActionResult response = Unauthorized();

            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenStr = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenStr });
            }

            return response;
        }

        [HttpPost("register")]
        public IActionResult Register(User registeredDetails)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registeredDetails.Password + _config["Salt:Value"]);
            User newUser = new User();
            newUser.Email = registeredDetails.Email;
            newUser.Password = hashedPassword;
            newUser.FirstName = registeredDetails.FirstName;
            newUser.LastName = registeredDetails.LastName;
            newUser.ContactNumber = registeredDetails.ContactNumber;

            db.Users.Add(newUser);
            db.SaveChanges();


            return CreatedAtAction("Register", new { email = registeredDetails.Email });

        }

        [Authorize]
        [HttpGet("GetMemberDetails")]
        public IActionResult GetMemberDetails(string email)
        {
            var results = db.Users.Find(email);
            User user = new User
            {
                Email = results.Email,
                FirstName = results.FirstName,
                LastName = results.LastName,
                ContactNumber = results.ContactNumber
            };

            var response = Ok(new { email = user.Email, FirstName = user.FirstName, LastName = user.LastName, ContactNumber = user.ContactNumber });
            return response;
        }

        [Authorize]
        [HttpGet("GetCarparkAvail")]
        public async Task<IActionResult> GetCarparkAvail(string email)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);
            DateTime localDate = DateTime.Now;
            string dateTime = localDate.ToString("yyyy-MM-ddTHH:mm:ss");
            //CultureInfo provider = CultureInfo.InvariantCulture;
            //DateTime localDateConverted = DateTime.ParseExact(dateTime,"yyyy-MM-dd[T]HH:mm:ss", provider);
            //string convertedLocalDateTimeString = localDateConverted.ToString();
            query["date_time"] = dateTime;
            string queryString = query.ToString();
            var request = new HttpRequestMessage(HttpMethod.Get,
            "https://api.data.gov.sg/v1/transport/carpark-availability?" + queryString);

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                CarparkData.Rootobject results = await JsonSerializer.DeserializeAsync<CarparkData.Rootobject>(responseStream);
                return Ok(new { results } );
            };
            return StatusCode(400);

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
                new Claim(JwtRegisteredClaimNames.Email,userInfo.FirstName),
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

        [Authorize]
        [HttpPost("Post")]
        public string Post()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var firstName = claim[1].Value;
            return "Welcome To: " + firstName;
        }

        [Authorize]
        [HttpGet("GetValue")]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "Value1", "Value2", "value3" };
        }

    }
}
