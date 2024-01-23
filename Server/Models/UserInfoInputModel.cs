using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class UserInfoInputModel
    {
        [StringLength(25, MinimumLength = 3, ErrorMessage = "The {0} must be between {2} and {1} characters long.")]
        public required string FirstName { get; set; }

        [StringLength(25, MinimumLength = 3, ErrorMessage = "The {0} must be between {2} and {1} characters long.")]
        public required string LastName { get; set; }
    }
}
