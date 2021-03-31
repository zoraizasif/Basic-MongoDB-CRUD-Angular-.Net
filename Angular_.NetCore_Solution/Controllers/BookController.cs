using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Angular_.NetCore_Solution.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {

        private readonly IMongoCollection<Book> _bookCollection;

        public BookController(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("TEMP");
            _bookCollection = database.GetCollection<Book>("Books");
        }

        [HttpGet("get/{id}")]
        public Book Get([FromRoute] string id)
        {
            var filter = new FilterDefinitionBuilder<Book>().Eq(book => book.Id, id);
            return _bookCollection.Find(filter).FirstOrDefault();
        }   
        
        [HttpPost("add")]
        public TaskStatus Add(Book book)
        {
            return _bookCollection.InsertOneAsync(new Book { Name = book.Name, SSN = book.SSN}).Status;
        }  
        
        [HttpGet("get-all")]
        public IEnumerable<Book> GetAll()
        {
            var filter = new FilterDefinitionBuilder<Book>().Empty;
            return _bookCollection.Find(filter).ToList();
        }

        [HttpDelete("delete/{id}")]
        public bool Delete([FromRoute] string id)
        {
            var filter = new FilterDefinitionBuilder<Book>().Eq(book => book.Id, id);
            return _bookCollection.DeleteOne(filter).IsAcknowledged;
        }  
        
        [HttpPut("update/{id}")]
        public bool Update([FromRoute] string id, Book book)
        {
            var filter = new FilterDefinitionBuilder<Book>().Eq(book => book.Id, id);
            var updateDefinition = Builders<Book>.Update.Set("name", book.Name).Set("ssn", book.SSN);
            return _bookCollection.UpdateOne(filter, updateDefinition).IsAcknowledged;
        }
    }
}