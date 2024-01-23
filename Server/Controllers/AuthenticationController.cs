using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Common;
using Server.Data.Models;
using Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<ApplicationUser> userManager,  IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);

            if (userExists != null) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "The user already exists!" });
            }

            var user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "An error occured. Please try again!" });
            }

            var userDTO = new UserModel
            {
                Username = user.UserName,
                FirstName = userExists.FirstName is null ? "John" : userExists.FirstName,
                LastName = userExists.LastName is null ? "Doe" : userExists.LastName,
                Token = CreateToken(user.UserName)
            };

            return Ok(userDTO);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);

            if (userExists != null && await _userManager.CheckPasswordAsync(userExists, model.Password))
            {
                var user = new UserModel
                {
                    Username = userExists.UserName,
                    FirstName = userExists.FirstName is null ? "John" : userExists.FirstName,
                    LastName = userExists.LastName is null ? "Doe" : userExists.LastName,
                    Token = CreateToken(userExists.UserName)
                };

                return Ok(user);
            }

            return Unauthorized(new Response { Status = "Error", Message = "The user does not exist!" });
        }

        [HttpPost]
        [Authorize]
        [Route("UpdateDetails")]
        public async Task<IActionResult> UpdateDetails([FromBody] UpdateDetailsModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);

            if (userExists != null)
            {
                userExists.FirstName = model.FirstName;
                userExists.LastName = model.LastName;

                await _userManager.UpdateAsync(userExists);

                var user = new UpdateDetailsModel
                {
                    Username = userExists.UserName,
                    FirstName = userExists.FirstName,
                    LastName = userExists.LastName,
                };

                return Ok(user);
            }

            return Unauthorized(new Response { Status = "Error", Message = "The user does not exist!" });
        }

        private string CreateToken(string username)
        {
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:ValidIssuer"],
                audience: _configuration["Jwt:ValidAudience"],
                expires: DateTime.UtcNow.AddMinutes(15),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256));

            var tokenWriter = new JwtSecurityTokenHandler();

            return tokenWriter.WriteToken(token);
        }
    }
}


