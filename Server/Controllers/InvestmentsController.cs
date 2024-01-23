using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Common;
using Server.Data.Models;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InvestmentsController : ControllerBase
    {
        private readonly IInvestmentManager _investmentManager;
        private readonly UserManager<ApplicationUser> _userManager;
        public InvestmentsController(IInvestmentManager investmentManager, UserManager<ApplicationUser> userManager)
        {
            _investmentManager = investmentManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] InvestmentInputModel input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var investment = await _investmentManager.CreateAsync(input, user.Id);
            var result = new InvestmentViewModel
            {
                Id = investment.Id,
                Name = investment.Name,
                Type = investment.Type,
                Value = investment.Value,
                Status = investment.Status == Status.Active ? "Active" : "Closed",
                CreatedOn = investment.CreatedOn
            };

            return Ok(result);
        }

        [HttpPost]
        [Route("Close")]
        public async Task<IActionResult> Close([FromBody] InvestmentInputId input)
        {
            var investment = await _investmentManager.CloseInvestmentAsync(input);
            var result = new InvestmentViewModel
            {
                Id = investment.Id,
                Name = investment.Name,
                Type = investment.Type,
                Value = investment.Value,
                Status = investment.Status == Status.Active ? "Active" : "Closed",
                CreatedOn = investment.CreatedOn
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAll")]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var investments = await _investmentManager.GetAllUserInvestmentsAsync(user.Id);
            var results = new List<InvestmentViewModel>();

            foreach (var investment in investments)
            {
                results.Add(new InvestmentViewModel
                {
                    Id = investment.Id,
                    Name = investment.Name,
                    Type = investment.Type,
                    Value = investment.Value,
                    Status = investment.Status == Status.Active ? "Active" : "Closed",
                    CreatedOn = investment.CreatedOn
                });
            }

            return Ok(results);
        }
    }
}
