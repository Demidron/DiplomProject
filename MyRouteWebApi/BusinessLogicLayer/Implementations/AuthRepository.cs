using BusinessLogicLayer.Interfaces;
using DataLayer;
using DataLayer.Entities;
using DTO.Models.UseCaseRequests;
using DTO.Models.UseCaseResponces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TokenProvider.Services;

namespace BusinessLogicLayer.Implementations
{
    public class AuthRepository : IAuthRepository
    {
        private UserManager<ApplicationUser> _userManager;
        public AuthRepository(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<RegisterUserResponse> CreateUser(RegisterUserRequest request)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = request.UserName,
                Email = request.Email,
                FullName = request.FullName
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, request.Password);
                await _userManager.AddToRoleAsync(applicationUser, request.Role);

                return result.Succeeded ? new RegisterUserResponse(applicationUser.Id, true) 
                    : new RegisterUserResponse(result.Errors.Select(e => e.Description));
            }
            catch (Exception ex)
            {
                return new RegisterUserResponse(new[] { ex.ToString() });
            }
        }
        public async Task<ApplicationUser> FindByName(string userName)
        {
            var appUser = await _userManager.FindByNameAsync(userName);
            return appUser;
        }
        public async Task<ApplicationUser> FindById(string id)
        {
            var appUser = await _userManager.FindByIdAsync(id);
            return appUser;
        }
        public async Task<bool> IsValidUser(ApplicationUser user,string role, string password)
        {
            var roles = await _userManager.GetRolesAsync(user);
            if (user != null && await _userManager.CheckPasswordAsync(user, password) && roles.Contains(role))
                return true;

            else return false;
        }
        public async Task<bool> IsValidRefreshToken(ApplicationUser user, string refreshToken)
        {
            return await _userManager.VerifyUserTokenAsync(user, "MyRouteApp", "RefreshToken", refreshToken);
        }
        public async Task<string> GenerateRefreshToken(ApplicationUser user)
        {
            await _userManager.RemoveAuthenticationTokenAsync(user, "MyRouteApp", "RefreshToken");
            var newRefreshToken = await _userManager.GenerateUserTokenAsync(user, "MyRouteApp", "RefreshToken");
            await _userManager.SetAuthenticationTokenAsync(user, "MyRouteApp", "RefreshToken", newRefreshToken);
            return newRefreshToken;
        }
        public async Task<IList<string>> GetRolesForUser(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            return roles;
        }
    }
}
