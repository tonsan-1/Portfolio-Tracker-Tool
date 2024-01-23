using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Server.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(25)]
        public string? FirstName { get; set; }

        [MaxLength(25)]
        public string? LastName { get; set; }

        public int? Age { get; set; }

        [MaxLength(4096)]
        public string? Description { get; set; }

        public virtual ICollection<Investment> Investments { get; set; } = new List<Investment>();
    }
}
