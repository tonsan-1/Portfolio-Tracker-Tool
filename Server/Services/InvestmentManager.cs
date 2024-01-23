using Microsoft.EntityFrameworkCore;
using Server.Common;
using Server.Data.Models;
using Server.Data.Repositories;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services
{
    public class InvestmentManager : IInvestmentManager
    {
        private readonly IRepository<Investment> _repository;

        public InvestmentManager(IRepository<Investment> repository)
        {
            _repository = repository;
        }

        public async Task<Investment> CloseInvestmentAsync(InvestmentInputId input)
        {
            var investment = await _repository
                .All()
                .FirstOrDefaultAsync(x => x.Id == input.Id);

            if (investment is null)
            {
                throw new Exception("Investment is null");
            }

            investment.Status = Status.Closed;

            _repository.Update(investment);
            await _repository.SaveChangesAsync();

            return investment;
        }

        public async Task<Investment> CreateAsync(InvestmentInputModel model, string userId)
        {
            var investment = new Investment
            {
                Status = Common.Status.Active,
                ApplicationUserId = userId,
                Name = model.Name,
                Type = model.Type,
                Value = model.Value,
            };

            await _repository.AddAsync(investment);
            await _repository.SaveChangesAsync();

            return investment;
        }

        public async Task<IEnumerable<Investment>> GetAllUserInvestmentsAsync(string userId)
            => await _repository.All()
                .Where(x => x.ApplicationUserId == userId)
                .ToListAsync();
    }
}
