using Microsoft.EntityFrameworkCore;
using Server.Data.Models;
using Server.Data.Repositories;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services
{
    public class UserManager : IUserManager
    {
        private readonly IRepository<ApplicationUser> _repository;

        public UserManager(IRepository<ApplicationUser> repository)
        {
            _repository = repository;
        }

        public async Task UpdateUserInfoAsync(UserInfoInputModel input, string userId)
        {
            var user = await _repository
                .All()
                .FirstOrDefaultAsync(x => x.Id == userId);

            user.FirstName = input.FirstName;
            user.LastName = input.LastName;

            _repository.Update(user);

            await _repository.SaveChangesAsync();
        }
    }
}
