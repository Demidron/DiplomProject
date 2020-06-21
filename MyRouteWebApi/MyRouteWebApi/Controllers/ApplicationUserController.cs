using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataLayer.Entities;
using DTO;
using DTO.Interfaces.UseCases;
using DTO.Models.UseCaseRequests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyRouteWebApi.Models;
using PresentationLayer.Models;
using PresentationLayer.Presenters;
using PresentationLayer.Services;

namespace MyRouteWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private readonly ApplicationSettings _appSettings;
        private readonly IRegisterUserUseCase _registerUserUseCase;
        private readonly RegisterUserPresenter _registerUserPresenter;
        private readonly ILoginUseCase _loginUseCase;
        private readonly LoginPresenter _loginPresenter;
        private readonly IRefreshTokenUseCase _refreshTokenUseCase;
        private readonly RefreshTokenPresenter _refreshTokenPresenter;

        public ApplicationUserController(IOptions<ApplicationSettings> appSettings, IRegisterUserUseCase registerUserUseCase, RegisterUserPresenter registerUserPresenter, ILoginUseCase loginUseCase, LoginPresenter loginPresenter, IRefreshTokenUseCase refreshTokenUseCase, RefreshTokenPresenter refreshTokenPresenter)
        {
            _appSettings = appSettings.Value;
            _registerUserUseCase = registerUserUseCase;
            _registerUserPresenter = registerUserPresenter;
            _loginUseCase = loginUseCase;
            _loginPresenter = loginPresenter;
            _refreshTokenUseCase = refreshTokenUseCase;
            _refreshTokenPresenter = refreshTokenPresenter;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<Object> RegisterUserTraveler(RegisterModel model)
        {
            await _registerUserUseCase.Handle(new RegisterUserRequest(model.UserName, model.Email, model.Password, model.FullName, Constants.Strings.Roles.Traveler), _registerUserPresenter);
            return _registerUserPresenter.ContentResult;
        }

        [HttpPost]
        [Route("LoginTraveler")]
        //POST : /api/ApplicationUser/LoginTraveler
        public async Task<IActionResult> Login(LoginModel model)
        {
            await _loginUseCase.Handle(new LoginRequest(model.UserName, model.Password, Constants.Strings.Roles.Traveler), _loginPresenter);
            return _loginPresenter.ContentResult;
        }

        [HttpPost]
        [Route("RefreshToken")]
        public async Task<ActionResult> RefreshToken(RefreshTokenModel request)
        {
            await _refreshTokenUseCase.Handle(new RefreshTokenRequest(request.AccessToken, request.RefreshToken, _appSettings.JWT_Secret), _refreshTokenPresenter);
            return _refreshTokenPresenter.ContentResult;
        }
    }
}