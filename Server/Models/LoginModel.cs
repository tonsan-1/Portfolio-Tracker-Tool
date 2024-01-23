using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Username is required!")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Password is required!")]
        public required string Password { get; set; }
    }
}
