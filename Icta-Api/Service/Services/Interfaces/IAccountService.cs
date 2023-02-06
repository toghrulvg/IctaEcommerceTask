using Service.DTOs.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services.Interfaces
{
    public interface IAccountService
    {
        Task<string?> LoginAsync(LoginDTO model);
        Task<ApiResponse> RegisterAsync(RegisterDTO model);

        Task CreateRole(RoleDTO model);
        
    }
}
