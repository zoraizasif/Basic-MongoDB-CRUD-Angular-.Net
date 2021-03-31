using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Angular_.NetCore_Solution
{
    public class Book
    {
        [BsonRepresentation(BsonType.ObjectId)] 
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("ssn")]
        public string SSN { get; set; }
    }
}