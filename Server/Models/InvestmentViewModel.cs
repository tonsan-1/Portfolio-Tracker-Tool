using Server.Common;

namespace Server.Models
{
    public class InvestmentViewModel
    {
        public required string Id { get; set; }
        public required string Name { get; set; }

        public required string Type { get; set; }

        public required decimal Value { get; set; }

        public string? Status { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
