using DTO.Interfaces;
using DTO.Models.UseCaseResponces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Models.UseCaseRequests
{
    public class LoginRequest : IUseCaseRequest<LoginResponse>
    {
        public string UserName { get; }
        public string Password { get; }
        public string Role {get; }
        public LoginRequest(string userName, string password, string role)
        {
            UserName = userName;
            Password = password;
            Role = role;
        }
    }
}
