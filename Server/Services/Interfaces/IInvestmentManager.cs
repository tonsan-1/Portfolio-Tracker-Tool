using Server.Data.Models;
using Server.Models;

namespace Server.Services.Interfaces
{
    public interface IInvestmentManager
    {
        Task<Investment> CreateAsync(InvestmentInputModel model, string userId);

        Task<Investment> CloseInvestmentAsync(InvestmentInputId input);

        Task<IEnumerable<Investment>> GetAllUserInvestmentsAsync(string userId);
    }
}
