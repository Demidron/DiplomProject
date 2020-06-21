using DTO.Models.UseCaseRequests;
using DTO.Models.UseCaseResponces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Interfaces.UseCases
{
    public interface ILoginUseCase : IUseCaseRequestHandler<LoginRequest, LoginResponse> {}
}
