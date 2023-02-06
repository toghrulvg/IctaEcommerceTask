using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Service.DTOs.Account;
using Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public AccountService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,IMapper mapper, IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _config = config;
        }

        public async Task<string?> LoginAsync(LoginDTO model)
        {
            var dbUser = await _userManager.FindByEmailAsync(model.Email);

            if (!await _userManager.CheckPasswordAsync(dbUser, model.Password))
                return null;


            var roles = await _userManager.GetRolesAsync(dbUser);


            return GenerateJwtToken(dbUser.UserName, dbUser.Id, (List<string>)roles);
        }

        public async Task<ApiResponse> RegisterAsync(RegisterDTO model)
        {
            AppUser user = _mapper.Map<AppUser>(model);

            IdentityResult result = await _userManager.CreateAsync(user, model.Password);


            if (!result.Succeeded)
            {
                ApiResponse response = new()
                {
                    Errors = result.Errors.Select(m => m.Description).ToList(),
                    StatusMessage = "Failed"

                };
                return response;
            }
            var dbUser = await _userManager.FindByEmailAsync(model.Email);

            await _userManager.AddToRoleAsync(dbUser, "Member");

            return new ApiResponse { Errors = null, StatusMessage = "Success" };
        }

        public async Task CreateRole(RoleDTO model)
        {
            await _roleManager.CreateAsync(new IdentityRole { Name = model.Role });
        }

        private string GenerateJwtToken(string username, string userId, List<string> roles)
        {
            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, username)
        };

            roles.ForEach(role =>
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            });

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_config["Jwt:ExpireDays"]));

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
