using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMongoCollection<AppUser> _collection;
    // Dependency Injection
    public UserController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");
    }

    [HttpPost("register")]
    public ActionResult<AppUser> Create(AppUser UserInput)
    {
        AppUser user = new AppUser(
            Id: null,
            Name: UserInput.Name,
            Email: UserInput.Email,
            Password: UserInput.Password,
            Age: UserInput.Age,
            IsAdmin: UserInput.IsAdmin
        );

        _collection.InsertOne(user);

        return user;
    }

    [HttpGet("get-by-email/{emailInput}")]
    public ActionResult<AppUser>? GetByEmail(string emailInput)
    {
        AppUser user = _collection.Find<AppUser>(doc =>
            doc.Email == emailInput).FirstOrDefault();

        // reza@gmail.com == amir@yahoo.com

        // variable != "Parsa"
        // if (user is not null)
        // {
        //     return user;
        // }

        if (user is null)
        {
            return NotFound("No user with this email exist.");
        }

        return user;
    }
}
