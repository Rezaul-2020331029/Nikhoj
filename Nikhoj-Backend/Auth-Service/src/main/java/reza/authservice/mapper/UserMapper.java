package reza.authservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import reza.authservice.dto.SignupRequest;
import reza.authservice.model.UserInfo;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserInfo singupRequestDtoToUserInfo(SignupRequest signupRequest);
    SignupRequest userInfoToSignupRequest(UserInfo userInfo);

}
