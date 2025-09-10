package reza.monolithicbackend.Auth.service;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reza.monolithicbackend.Auth.dto.LoginRequest;
import reza.monolithicbackend.Auth.dto.SignupRequest;
import reza.monolithicbackend.Auth.exception.user.DuplicateUserException;
import reza.monolithicbackend.Auth.exception.user.UserRegistrationException;
import reza.monolithicbackend.Auth.mapper.UserMapper;
import reza.monolithicbackend.Auth.model.Role;
import reza.monolithicbackend.Auth.model.UserInfo;
import reza.monolithicbackend.Auth.repository.UserInfoRepository;
import reza.monolithicbackend.Auth.utils.Enums;


import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    final UserInfoRepository userInfoRepository;
    final PasswordEncoder passwordEncoder;
    final JwtTokenService jwtService;
    final AuthenticationManager authenticationManager;
    final RoleService roleService;
    final UserMapper mapper;

    public UserService(AuthenticationManager authenticationManager, JwtTokenService jwtService, PasswordEncoder passwordEncoder, UserInfoRepository userInfoRepository, RoleService roleService, UserMapper mapper) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.userInfoRepository = userInfoRepository;
        this.roleService = roleService;
        this.mapper = mapper;
    }

//    public ResponseEntity<?> authenticate(LoginRequest loginRequest) {
//        try {
//            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
//
//            if (auth.isAuthenticated()) {
//                Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
//                String jwtToken = jwtService.createToken(loginRequest.getEmail(), authorities);
//                return ResponseEntity.ok().body(jwtToken);
//            } else {
//                throw new BadCredentialsException("Invalid username or password");
//            }
//        } catch (AuthenticationException e) {
//            throw new BadCredentialsException("Invalid username or password");
//        }
//    }
//
//    public ResponseEntity<?> register(SignupRequest signupRequest) {
//        try{
//            UserInfo user = mapper.singupRequestDtoToUserInfo(signupRequest);
//            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
//            user.setEmail(signupRequest.getEmail());
//            user.setName(signupRequest.getName());
//            user.setProvider(Enums.AuthProvider.local);
//            user.setProviderId("LOCAL");
//            user.setEmailVerified(false);
//            user.setImageUrl(null);
//            List<Role> roles = new ArrayList<>();
//            System.out.println(roleService.getRoleByName(Enums.RoleType.ROLE_USER));
//
//
//            roles.add(roleService.getRoleByName(Enums.RoleType.ROLE_USER));
//            System.out.println(roles);
//
//            roleService.giveRolesToUser(user, roles);
//            userInfoRepository.save(user);
//            return ResponseEntity.ok().body("Registration Successful");
//
//        }catch (DataIntegrityViolationException e){
//            throw new DuplicateUserException("Invalid Registration Request");
//        }
//        catch (Exception e){
//            System.out.println("cdi" + e.getMessage());
//            throw new UserRegistrationException("Invalid Registration Request");
//        }
//    }


    public ResponseEntity<String> authenticate(LoginRequest loginRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            if (auth.isAuthenticated()) {
                // Get the user to access their UUID
                UserInfo user = userInfoRepository.findByEmail(loginRequest.getEmail())
                        .orElseThrow(() -> new BadCredentialsException("User not found"));

                Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
                String jwtToken = jwtService.createToken(user.getId().toString(), authorities); // Use UUID as string
                return ResponseEntity.ok(jwtToken);
            } else {
                throw new BadCredentialsException("Invalid username or password");
            }
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    public ResponseEntity<String> register(SignupRequest signupRequest) {
        try {
            UserInfo user = mapper.singupRequestDtoToUserInfo(signupRequest);
            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            user.setProvider(Enums.AuthProvider.local);
            user.setProviderId("LOCAL");
            user.setEmailVerified(false);

            Role userRole = roleService.getRoleByName(Enums.RoleType.ROLE_USER);
            roleService.giveRolesToUser(user, List.of(userRole));
            userInfoRepository.save(user);

            return ResponseEntity.ok("Registration Successful");

        } catch (DataIntegrityViolationException e) {
            throw new DuplicateUserException("User already exists with this email");
        } catch (Exception e) {
            throw new UserRegistrationException("Registration failed. Please try again.");
        }
    }

    public UserInfo getUserById(UUID id)
    {
        return userInfoRepository.findById(id)
                .orElseThrow(() -> new UserRegistrationException("User not found"));
    }

    public UserInfo saveUser(UserInfo user)
    {
        return userInfoRepository.save(user);
    }

}
