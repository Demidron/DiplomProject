using BusinessLogicLayer.Interfaces;
using DTO;
using DTO.Interfaces;
using DTO.Interfaces.UseCases;
using DTO.Models.UseCaseRequests;
using DTO.Models.UseCaseResponces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TokenProvider.Interfaces;

namespace PresentationLayer.UseCases
{
    public sealed class RefreshTokenUseCase : IRefreshTokenUseCase
    {
        private readonly IAuthRepository _authRepository;
        private readonly ITokenService _tokenService;
        public RefreshTokenUseCase(IAuthRepository authRepository, ITokenService tokenService)
        {
            _authRepository = authRepository;
            _tokenService = tokenService;
        }
        public async Task<bool> Handle(RefreshTokenRequest request, IOutputPort<RefreshTokenResponse> outputPort)
        {
            var cp = _tokenService.GetPrincipalFromToken(request.AccessToken, request.SigningKey);

            if (cp == null)
            {
                outputPort.Handle(new RefreshTokenResponse(false, "Invalid token/signing key was passed and we can't extract user claims"));
                return false;
            }

            var id = cp.Claims.First(c => c.Type == Constants.Strings.JwtClaimIdentifiers.UserId);
            var role = cp.Claims.First(c => c.Type == ClaimTypes.Role);
            var user = await _authRepository.FindById(id.Value);

            if (!await _authRepository.IsValidRefreshToken(user, request.RefreshToken))
            {
                outputPort.Handle(new RefreshTokenResponse(false, "Invalid token."));
                return false;
            }

            var jwtToken = _tokenService.GenerateAccessToken(user.Id, user.UserName,role.Value);

            var refreshToken = await _authRepository.GenerateRefreshToken(user);

            outputPort.Handle(new RefreshTokenResponse(jwtToken, refreshToken, true));
            return true;
        }
    }
}
