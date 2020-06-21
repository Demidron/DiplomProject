using BusinessLogicLayer.Interfaces;
using DTO.Interfaces;
using DTO.Interfaces.UseCases;
using DTO.Models.UseCaseRequests;
using DTO.Models.UseCaseResponces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TokenProvider.Interfaces;
using TokenProvider.Services;

namespace PresentationLayer.UseCases
{
    public sealed class LoginUseCase : ILoginUseCase
    {
        private readonly IAuthRepository _authRepository;
        private readonly ITokenService _tokenService;
        public LoginUseCase(IAuthRepository authRepository, ITokenService tokenService)
        {
            _authRepository = authRepository;
            _tokenService = tokenService;
        }

        public async Task<bool> Handle(LoginRequest request, IOutputPort<LoginResponse> outputPort)
        {
            if (string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
                return false;
            var user = await _authRepository.FindByName(request.UserName);
            
            if (!await _authRepository.IsValidUser(user, request.Role, request.Password))
            {
                outputPort.Handle(new LoginResponse(new[] { "Invalid username or password." }));
                return false;
            }

            var refreshToken = await _authRepository.GenerateRefreshToken(user);
           
            //        await _userManager.SetAuthenticationTokenAsync(user, "MyApp", "RefreshToken", newRefreshToken);

            //        var role = await _userManager.GetRolesAsync(user);

            var accessToken = _tokenService.GenerateAccessToken(user.Id, user.UserName, request.Role);
            outputPort.Handle(new LoginResponse(accessToken,refreshToken,true,null));
            return true;
        }
    }
}
