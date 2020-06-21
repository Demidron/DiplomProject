using BusinessLogicLayer.Interfaces;
using DataLayer.Entities;
using DTO.Interfaces;
using DTO.Interfaces.UseCases;
using DTO.Models.UseCaseRequests;
using DTO.Models.UseCaseResponces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PresentationLayer.UseCases
{
    public sealed class RegisterUserUseCase : IRegisterUserUseCase
    {

        private readonly IAuthRepository _authRepository;
        
        public RegisterUserUseCase(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<bool> Handle(RegisterUserRequest message, IOutputPort<RegisterUserResponse> outputPort)
        {
            var response = await _authRepository.CreateUser(message);
            outputPort.Handle(response);
            return response.Success;
        }
    }
}
