using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class InvestmentInputModel
    {
        [StringLength(50, MinimumLength = 3, ErrorMessage = "The {0} must be between {2} and {1} characters long.")]
        public required string Name { get; set; }

        [StringLength(50, MinimumLength = 3, ErrorMessage = "The {0} must be between {2} and {1} characters long.")]
        public required string Type { get; set; }

        public required decimal Value { get; set; }
    }
}
