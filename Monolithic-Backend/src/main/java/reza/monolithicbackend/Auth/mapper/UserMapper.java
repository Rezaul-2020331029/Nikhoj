package reza.monolithicbackend.Auth.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import reza.monolithicbackend.Auth.dto.SignupRequest;
import reza.monolithicbackend.Auth.model.UserInfo;


@Mapper(componentModel = "spring")
public interface UserMapper {

    UserInfo singupRequestDtoToUserInfo(SignupRequest signupRequest);
    SignupRequest userInfoToSignupRequest(UserInfo userInfo);

}
