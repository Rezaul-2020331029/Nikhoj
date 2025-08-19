//package reza.postservice.filter;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.context.MessageSource;
//import org.springframework.context.i18n.LocaleContextHolder;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.web.ErrorResponse;
//import org.springframework.web.filter.OncePerRequestFilter;
//import reza.postservice.util.JwtUtil;
//
//import java.io.IOException;
//
//@Component
//public class GatewayRequestValidator extends OncePerRequestFilter {
//
//    private final JwtUtil jwtTokenService;
//    private final MessageSource messageSource;
//
//    public GatewayRequestValidator(JwtUtil jwtTokenProvider, MessageSource messageSource) {
//        this.jwtTokenService = jwtTokenProvider;
//        this.messageSource = messageSource;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        try {
//
//            System.out.println("l1");
//            String token = jwtTokenService.resolveToken(request);
//            System.out.println("l2");
//            jwtTokenService.validateToken(token);
//            System.out.println("l3");
//
//        } catch (Exception ex) {
//            System.out.println(ex.getMessage());
//            String message = messageSource.getMessage("intruder.exception", new Object[]{ex.getMessage()}, LocaleContextHolder.getLocale());
//            var responseData = new ResponseEntity<>(ErrorResponse.create(ex, HttpStatus.UNAUTHORIZED, message), HttpStatus.UNAUTHORIZED);
//
//            response.setStatus(HttpStatus.UNAUTHORIZED.value());
//            response.setContentType("application/json");
//            response.setCharacterEncoding("UTF-8");
//
//            ObjectMapper objectMapper = new ObjectMapper();
//            String jsonResponse = objectMapper.writeValueAsString(responseData.getBody());
//            response.getWriter().write(jsonResponse);
//            return;
//        }
//        filterChain.doFilter(request, response);
//    }
//
//}
