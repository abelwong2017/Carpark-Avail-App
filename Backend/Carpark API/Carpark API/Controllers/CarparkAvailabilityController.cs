using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using Carpark_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Carpark_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarparkAvailabilityController : ControllerBase
    {

        private readonly IHttpClientFactory _clientFactory;


        public CarparkAvailabilityController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string email)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);
            DateTime localDate = DateTime.Now;
            string dateTime = localDate.ToString("yyyy-MM-ddTHH:mm:ss");
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
                return Ok(new { results });
            };
            return StatusCode(400);

        }

    }
}
