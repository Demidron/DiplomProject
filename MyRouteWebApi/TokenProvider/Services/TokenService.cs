using DataLayer.Entities;
using DTO;
using DTO.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NLog;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using TokenProvider.Interfaces;

namespace TokenProvider.Services
{
    public class TokenService : ITokenService
    {
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        public TokenService(IOptions<JwtIssuerOptions> jwtOptions)
        {
            if (_jwtSecurityTokenHandler == null)
                _jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            _jwtOptions = jwtOptions.Value;
            ThrowIfInvalidOptions(_jwtOptions);
        }
        public AccessToken GenerateAccessToken(string id, string userName, string role)
        {
            ClaimsIdentity claims = new ClaimsIdentity(new GenericIdentity(userName, "Token"),new []
            {
                new Claim(Constants.Strings.JwtClaimIdentifiers.UserId,id),
                new Claim(ClaimTypes.Role,role.ToString())
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience= _jwtOptions.Audience,
                Issuer=_jwtOptions.Issuer,

                Subject = claims,
                Expires = _jwtOptions.Expiration,
                SigningCredentials = _jwtOptions.SigningCredentials 
            };
            
            var securityToken = _jwtSecurityTokenHandler.CreateToken(tokenDescriptor);
            var token = _jwtSecurityTokenHandler.WriteToken(securityToken);

            return new AccessToken(token, (int)_jwtOptions.ValidFor.TotalSeconds);

        }

        public ClaimsPrincipal GetPrincipalFromToken(string token, string signingKey)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)),
                ValidateLifetime = false // we check expired tokens here
            };
            try
            {
                var principal = _jwtSecurityTokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);

                if (!(securityToken is JwtSecurityToken jwtSecurityToken) || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");

                return principal;
            }
            catch (Exception e)
            {
                var logger = LogManager.GetCurrentClassLogger();
                logger.Error($"Token validation failed: {e.Message}");
                return null;
            }
        }
        private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
            }
        }
    }
}
