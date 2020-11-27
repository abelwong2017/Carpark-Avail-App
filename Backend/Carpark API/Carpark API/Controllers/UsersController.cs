using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Carpark_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Carpark_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IConfiguration _config;
        private readonly UsersContext db;

        public UsersController(IConfiguration config, UsersContext db)
        {
            _config = config;
            this.db = db;
        }

        [HttpPost]
        public IActionResult Post(User registeredDetails)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registeredDetails.Password + _config["Salt:Value"]);
            User newUser = new User();
            newUser.Email = registeredDetails.Email;
            newUser.Password = hashedPassword;
            newUser.FirstName = registeredDetails.FirstName;
            newUser.LastName = registeredDetails.LastName;
            newUser.ContactNumber = registeredDetails.ContactNumber;
            try
            {
                db.Users.Add(newUser);
                db.SaveChanges();

                return CreatedAtAction("Post", new { email = registeredDetails.Email });
            }
            catch (System.Exception e)
            {
                return StatusCode(500);
            }


        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            string email = claim[0].Value;

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
    }
}
