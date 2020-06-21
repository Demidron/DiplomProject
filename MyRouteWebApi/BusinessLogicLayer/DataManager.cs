using BusinessLogicLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicLayer
{
    public class DataManager
    {
        private IAuthRepository _authRepository;
        public DataManager(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }
        public IAuthRepository AuthRepository { get { return _authRepository; } }
    }
}
