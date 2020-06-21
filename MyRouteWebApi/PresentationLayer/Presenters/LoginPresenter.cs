using DTO.Interfaces;
using DTO.Models.UseCaseResponces;
using PresentationLayer.Models;
using PresentationLayer.Services;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace PresentationLayer.Presenters
{
    public sealed class LoginPresenter : IOutputPort<LoginResponse>
    {
        public JsonContentResult ContentResult { get; }

        public LoginPresenter()
        {
            ContentResult = new JsonContentResult();
        }

        public void Handle(LoginResponse response)
        {
            ContentResult.StatusCode = (int)(response.Success ? HttpStatusCode.OK : HttpStatusCode.Unauthorized);
            ContentResult.Content = response.Success ? JsonSerializer.SerializeObject(response) : JsonSerializer.SerializeObject(response.Errors);
        }
    }
}
