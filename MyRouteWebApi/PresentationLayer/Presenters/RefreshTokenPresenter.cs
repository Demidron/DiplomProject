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
    public sealed class RefreshTokenPresenter : IOutputPort<RefreshTokenResponse>
    {
        public JsonContentResult ContentResult { get; }
        public RefreshTokenPresenter()
        {
            ContentResult = new JsonContentResult();
        }

        public void Handle(RefreshTokenResponse response)
        {
            ContentResult.StatusCode = (int)(response.Success ? HttpStatusCode.OK : HttpStatusCode.BadRequest);
            ContentResult.Content = response.Success ? JsonSerializer.SerializeObject(response) : JsonSerializer.SerializeObject(response.Message);
        }
    }
}
