namespace Server.Models
{
    public class UserModel
    {
        public required string Username { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Token { get; set; }
    }
}
