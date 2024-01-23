using System.ComponentModel.DataAnnotations;

namespace Server.Data.Models
{
    public abstract class BaseModel<TKey>
    {
        [Key]
        public TKey? Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
