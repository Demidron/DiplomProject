using DTO.Interfaces;
using DTO.Models.UseCaseResponces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Models.UseCaseRequests
{
    public class RegisterUserRequest : IUseCaseRequest<RegisterUserResponse>
    {
        public string UserName { get; }
        public string Email { get; }
        public string Password { get; }
        public string FullName { get; set; }
        public string Role { get; set; }

        public RegisterUserRequest(string userName, string email, string password, string fullName, string role)
        {
            UserName = userName;
            Email = email;
            Password = password;
            FullName = fullName;
            Role = role;
        }
    }
}
