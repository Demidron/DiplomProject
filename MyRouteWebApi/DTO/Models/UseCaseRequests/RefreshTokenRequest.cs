using DTO.Interfaces;
using DTO.Models.UseCaseResponces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Models.UseCaseRequests
{
    public class RefreshTokenRequest : IUseCaseRequest<RefreshTokenResponse>
    {
        public string AccessToken { get; }
        public string RefreshToken { get; }
        public string SigningKey { get; }

        public RefreshTokenRequest(string accessToken, string refreshToken, string signingKey)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
            SigningKey = signingKey;
        }
    }
}
