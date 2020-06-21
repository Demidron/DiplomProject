using DataLayer.Entities;
using DTO.Models.UseCaseRequests;
using DTO.Models.UseCaseResponces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interfaces
{
    public interface IAuthRepository
    {
        Task<RegisterUserResponse> CreateUser(RegisterUserRequest request);
        Task<ApplicationUser> FindByName(string userName);
        Task<ApplicationUser> FindById(string id);
        Task<bool> IsValidUser(ApplicationUser user, string role, string password);
        Task<bool> IsValidRefreshToken(ApplicationUser user, string refreshToken);
        Task<string> GenerateRefreshToken(ApplicationUser user);
        Task<IList<string>> GetRolesForUser(ApplicationUser user);
    }
}
