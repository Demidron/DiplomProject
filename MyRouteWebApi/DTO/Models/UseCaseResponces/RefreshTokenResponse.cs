using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Models.UseCaseResponces
{
    public class RefreshTokenResponse : UseCaseResponseMessage
    {
        public AccessToken AccessToken { get; }
        public string RefreshToken { get; }

        public RefreshTokenResponse(bool success = false, string message = null) : base(success, message)
        {
        }

        public RefreshTokenResponse(AccessToken accessToken, string refreshToken, bool success = false, string message = null) : base(success, message)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }
    }
}
