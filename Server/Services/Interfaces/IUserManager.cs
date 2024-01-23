using Server.Models;

namespace Server.Services.Interfaces
{
    public interface IUserManager
    {
        Task UpdateUserInfoAsync(UserInfoInputModel input, string userId);
    }
}
