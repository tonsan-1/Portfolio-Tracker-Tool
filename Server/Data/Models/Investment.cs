using Server.Common;
using System.ComponentModel.DataAnnotations;

namespace Server.Data.Models
{
    public class Investment : BaseModel<string>
    {
        public Investment()
        {
            Id = Guid.NewGuid().ToString();
            CreatedOn = DateTime.Now;
        }

        public required string ApplicationUserId {  get; set; }

        public virtual ApplicationUser? ApplicationUser { get; set; }

        [MaxLength(50)]
        public required string Name { get; set; }

        [MaxLength(50)]
        public required string Type { get; set; }

        public Status Status { get; set; }

        [Range(1, double.MaxValue)]
        public required decimal Value { get; set; }
    }
}
