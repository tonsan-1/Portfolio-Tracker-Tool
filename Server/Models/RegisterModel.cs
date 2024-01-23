﻿using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class RegisterModel
    {
        [Required (ErrorMessage = "Username is required!")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Email is required!")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required!")]
        public required string Password { get; set; }
    }
}
