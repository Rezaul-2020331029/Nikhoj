package reza.authservice.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reza.authservice.dto.UserInfoUserDetails;
import reza.authservice.model.UserInfo;
import reza.authservice.repository.UserInfoRepository;

import java.util.Optional;

//This class maps the user info from our db to the user details which is the object stored in spring security.
@Service
public class UserInfoUserDetailsService implements UserDetailsService {

    private final UserInfoRepository userInfoRepository;

    public UserInfoUserDetailsService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userInfo = userInfoRepository.findByEmail(username);
        return userInfo.map(UserInfoUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}