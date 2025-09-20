package reza.authservice.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import reza.authservice.dto.SignupRequest;
import reza.authservice.model.UserInfo;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-08-14T18:15:21+0600",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserInfo singupRequestDtoToUserInfo(SignupRequest signupRequest) {
        if ( signupRequest == null ) {
            return null;
        }

        UserInfo userInfo = new UserInfo();

        userInfo.setName( signupRequest.getName() );
        userInfo.setEmail( signupRequest.getEmail() );
        userInfo.setPassword( signupRequest.getPassword() );
        userInfo.setImageUrl( signupRequest.getImageUrl() );

        return userInfo;
    }

    @Override
    public SignupRequest userInfoToSignupRequest(UserInfo userInfo) {
        if ( userInfo == null ) {
            return null;
        }

        SignupRequest.SignupRequestBuilder signupRequest = SignupRequest.builder();

        signupRequest.name( userInfo.getName() );
        signupRequest.email( userInfo.getEmail() );
        signupRequest.password( userInfo.getPassword() );
        signupRequest.imageUrl( userInfo.getImageUrl() );

        return signupRequest.build();
    }
}
