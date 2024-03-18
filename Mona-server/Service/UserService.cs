using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Mona.Model;
using Mona.Service.Interface;

namespace Mona.Service;

public class UserService(UserManager<ApplicationUser> userManager) : IUserService
{
    public async Task<IEnumerable<UserDto>> GetUsersExceptCaller(string username)
    {
        return await userManager.Users
            .Select(user => new UserDto
                { Username = user.UserName, FirstName = user.FirstName, LastName = user.LastName })
            .Where(user => !user.Username.Equals(username)).ToListAsync();
    }
}