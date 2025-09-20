package reza.monolithicbackend.Auth.security.filtter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import reza.monolithicbackend.Auth.model.UserInfo;
import reza.monolithicbackend.Auth.repository.UserInfoRepository;
import reza.monolithicbackend.Auth.service.JwtTokenService;


import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

//    private final JwtTokenService jwtTokenService;
//    private final UserDetailsService userDetailsService;
//
//    @Autowired
//    private HandlerExceptionResolver handlerExceptionResolver;
//
//    public JwtAuthenticationFilter(JwtTokenService jwtTokenProvider, UserDetailsService userDetailsService) {
//        this.jwtTokenService = jwtTokenProvider;
//        this.userDetailsService = userDetailsService;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String token = jwtTokenService.resolveToken(request);
//
//        try {
//            if (token != null && jwtTokenService.validateToken(token)) {
//                String username = jwtTokenService.getUsername(token);
//                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        } catch (Exception ex) {
//            handlerExceptionResolver.resolveException(request, response, null, ex);
//            return;
//        }
//
//        filterChain.doFilter(request, response);
//    }



    private final JwtTokenService jwtTokenService;
    private final UserDetailsService userDetailsService;
    private final UserInfoRepository userInfoRepository;

    @Autowired
    private HandlerExceptionResolver handlerExceptionResolver;

    public JwtAuthenticationFilter(JwtTokenService jwtTokenProvider, UserDetailsService userDetailsService, UserInfoRepository userInfoRepository) {
        this.jwtTokenService = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtTokenService.resolveToken(request);

        try {
            if (token != null && jwtTokenService.validateToken(token)) {
                UUID userId = jwtTokenService.getUserUUID(token);
                UserInfo user = userInfoRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));

                UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(Map.of("userId", userId));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            handlerExceptionResolver.resolveException(request, response, null, ex);
            return;
        }

        filterChain.doFilter(request, response);
    }

}

