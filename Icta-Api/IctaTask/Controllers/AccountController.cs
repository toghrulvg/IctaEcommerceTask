using Microsoft.AspNetCore.Mvc;
using Service.DTOs.Account;
using Service.Services.Interfaces;

namespace IctaTask.Controllers
{
    public class AccountController : AppController
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterDTO user)
        {
            return Ok(await _accountService.RegisterAsync(user));
        }



        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTO user)
        {
            return Ok(await _accountService.LoginAsync(user));
        }
        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] RoleDTO role)
        {
            await _accountService.CreateRole(role);
            return Ok();
        }
    }
}
