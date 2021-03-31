using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Angular_.NetCore_Solution.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private IMongoCollection<Book> _bookCollection;

        public WeatherForecastController(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("TEMP");
            _bookCollection = database.GetCollection<Book>("Book");
        }

        [HttpGet]
        public IEnumerable<Book> GetByMongo()
        {
            return _bookCollection.Find(book => book.Name.ToLower() == "abc").ToList();
        }
    }
}