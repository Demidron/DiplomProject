using DTO.Models;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace TokenProvider.Interfaces
{
    public interface ITokenService
    {
        AccessToken GenerateAccessToken(string id, string userName, string role);
        ClaimsPrincipal GetPrincipalFromToken(string token, string signingKey);
    }
}
